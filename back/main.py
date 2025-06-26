# main.py - FastAPI backend for Fashion Shopping Assistant
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from models.product import ChatRequest, ChatResponse, Product
from scrapers.amazon import AmazonScraper
from scrapers.flipkart import FlipkartScraper
from services.ai_service import ai_service
from services.cache_service import cache
from typing import List
import asyncio
import hashlib
import time

# Initialize FastAPI app
app = FastAPI(title="Fashion Shopping Assistant API", version="1.0.0")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize web scrapers for different e-commerce platforms
amazon_scraper = AmazonScraper()
flipkart_scraper = FlipkartScraper()

# Rate limiting to prevent abuse
last_request_time = {}
RATE_LIMIT_SECONDS = 2

async def rate_limit_check(client_ip: str):
    """Check if client is making requests too frequently"""
    current_time = time.time()
    if client_ip in last_request_time:
        time_diff = current_time - last_request_time[client_ip]
        if time_diff < RATE_LIMIT_SECONDS:
            raise HTTPException(status_code=429, detail="Rate limit exceeded")
    last_request_time[client_ip] = current_time

async def search_products(query: str, limit: int = 6) -> List[Product]:
    """Search products across all e-commerce platforms with caching"""
    
    # Create unique cache key based on query
    cache_key = f"search:{hashlib.md5(query.lower().encode()).hexdigest()}"
    
    # Check if results are already cached
    cached_products = await cache.get(cache_key)
    if cached_products:
        print(f"Cache hit for query: {query}")
        return cached_products
    
    print(f"Searching for: {query}")
    
    # Search all platforms concurrently for better performance
    tasks = [
        amazon_scraper.search(query, limit//2),
        flipkart_scraper.search(query, limit//2),
    ]
    
    try:
        # Execute all scraping tasks simultaneously
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Combine results from all platforms
        all_products = []
        for result in results:
            if isinstance(result, list):
                all_products.extend(result)
            elif isinstance(result, Exception):
                print(f"Scraper error: {result}")
        
        # Remove duplicate products and limit results
        unique_products = []
        seen_names = set()
        
        for product in all_products:
            # Simple deduplication by name similarity
            name_key = product.name.lower()[:50]
            if name_key not in seen_names:
                seen_names.add(name_key)
                unique_products.append(product)
                
                if len(unique_products) >= limit:
                    break
        
        # Cache results for 5 minutes to improve performance
        await cache.set(cache_key, unique_products, expire=300)
        
        return unique_products
        
    except Exception as e:
        print(f"Search error: {e}")
        return []

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest, background_tasks: BackgroundTasks):
    """Main chat endpoint - handles user messages and returns AI responses with products"""
    
    try:
        # Get AI response for user message
        ai_response = await ai_service.chat(request.message)
        
        # Determine if user is looking for products to buy
        should_search = ai_service.detect_shopping_intent(request.message)
        
        products = []
        if should_search:
            # Search for relevant products if shopping intent detected
            products = await search_products(request.message, limit=6)
        
        return ChatResponse(
            response=ai_response,
            products=products,
            has_products=len(products) > 0
        )
        
    except Exception as e:
        print(f"Chat endpoint error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/search", response_model=List[Product])
async def search_endpoint(q: str, limit: int = 10):
    """Direct product search endpoint for explicit product queries"""
    
    if not q or len(q.strip()) < 2:
        raise HTTPException(status_code=400, detail="Query too short")
    
    products = await search_products(q.strip(), limit)
    return products

@app.get("/health")
async def health_check():
    """Health check endpoint to monitor API status"""
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "scrapers": {
            "amazon": "active",
            "flipkart": "active"
        }
    }

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup resources when server shuts down"""
    await amazon_scraper.close()
    await flipkart_scraper.close()

# Run server if script is executed directly
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)