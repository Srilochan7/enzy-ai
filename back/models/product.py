from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class Product(BaseModel):
    id: str
    name: str
    price: str
    image_url: str
    product_url: str
    platform: str
    rating: Optional[float] = None
    scraped_at: datetime

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    products: List[Product] = []
    has_products: bool = False