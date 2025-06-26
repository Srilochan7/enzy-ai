from models.product import Product
from typing import List
from datetime import datetime
import asyncio

class AmazonScraper:
    async def search(self, query: str, limit: int = 5) -> List[Product]:
        await asyncio.sleep(1)
        
        return [
            Product(
                id=f"amz_{hash(query)}_{int(datetime.now().timestamp())}",
                name=f"Amazon {query.title()} - Premium Quality",
                price="₹2,999",
                image_url="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=400&fit=crop",
                product_url=f"https://amazon.in/s?k={query.replace(' ', '+')}",
                platform="Amazon",
                rating=4.2,
                scraped_at=datetime.now()
            )
        ]
    
    async def close(self):
        pass