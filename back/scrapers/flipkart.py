from models.product import Product
from typing import List
from datetime import datetime
import asyncio

class FlipkartScraper:
    async def search(self, query: str, limit: int = 5) -> List[Product]:
        await asyncio.sleep(1)
        
        return [
            Product(
                id=f"fk_{hash(query)}_{int(datetime.now().timestamp())}",
                name=f"Flipkart {query.title()} - Best Deal",
                price="₹2,499",
                image_url="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop",
                product_url=f"https://flipkart.com/search?q={query.replace(' ', '%20')}",
                platform="Flipkart",
                rating=4.1,
                scraped_at=datetime.now()
            )
        ]
    
    async def close(self):
        pass