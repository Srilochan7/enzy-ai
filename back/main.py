# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.product import ChatRequest, ChatResponse, Product
from services.ai_service import ai_service
from services.product_search_service import product_search_service
from typing import List
import time

app = FastAPI(title="Fashion Shopping Assistant API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Enhanced chat endpoint that always returns relevant products"""
    
    try:
        # Extract structured product information using AI
        product_info = await ai_service.extract_product_info(request.message)
        
        # Search for products based on extracted information
        products = await product_search_service.search_products(
            product_info, 
            limit=8
        )
        
        # Generate contextual AI response
        ai_response = await ai_service.generate_response(
            request.message, 
            product_info, 
            len(products)
        )
        
        return ChatResponse(
            response=ai_response,
            products=products,
            has_products=len(products) > 0,
            product_info=product_info  # Optional: include for debugging
        )
        
    except Exception as e:
        print(f"Chat endpoint error: {e}")
        
        # Fallback: try simple keyword search
        try:
            fallback_products = await product_search_service.search_products(
                {"search_query": request.message, "product_type": "clothing"},
                limit=6
            )
            
            return ChatResponse(
                response="Here are some products I found for you! 🛍️",
                products=fallback_products,
                has_products=len(fallback_products) > 0
            )
        except:
            raise HTTPException(status_code=500, detail="Unable to process request")

@app.get("/search", response_model=List[Product])
async def search_endpoint(q: str, limit: int = 10):
    """Direct product search endpoint"""
    
    if not q or len(q.strip()) < 2:
        raise HTTPException(status_code=400, detail="Query too short")
    
    # Extract product info and search
    product_info = await ai_service.extract_product_info(q)
    products = await product_search_service.search_products(product_info, limit)
    
    return products

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "version": "2.0.0"
    }

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup resources"""
    await product_search_service.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)