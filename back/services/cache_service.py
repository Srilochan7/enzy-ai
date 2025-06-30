import json
import time
from typing import Any, Optional, List
from models.product import Product

class SimpleCache:
    """Simple in-memory cache for development"""
    
    def __init__(self):
        self.cache = {}
        self.expiry = {}
    
    async def get(self, key: str) -> Optional[List[Product]]:
        """Get cached products"""
        if key in self.cache:
            if key in self.expiry and time.time() > self.expiry[key]:
                # Expired
                del self.cache[key]
                del self.expiry[key]
                return None
            
            # Convert dict back to Product objects
            cached_data = self.cache[key]
            return [Product(**item) for item in cached_data]
        return None
    
    async def set(self, key: str, products: List[Product], expire: int = 300):
        """Cache products"""
        # Convert Product objects to dicts for storage
        self.cache[key] = [product.dict() for product in products]
        self.expiry[key] = time.time() + expire
    
    def clear(self):
        """Clear all cache"""
        self.cache.clear()
        self.expiry.clear()

# Create global cache instance
cache = SimpleCache()