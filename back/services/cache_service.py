# services/cache_service.py
import redis
import json
import pickle
from typing import Optional, List, Any
from models.product import Product
import os

class CacheService:
    def __init__(self):
        # Use Redis if available, otherwise in-memory dict
        try:
            self.redis_client = redis.Redis(
                host=os.getenv('REDIS_HOST', 'localhost'),
                port=int(os.getenv('REDIS_PORT', 6379)),
                db=0,
                decode_responses=False
            )
            self.redis_client.ping()
            self.use_redis = True
            print("Connected to Redis")
        except:
            self.use_redis = False
            self.memory_cache = {}
            print("Using in-memory cache")
    
    async def get(self, key: str) -> Optional[Any]:
        try:
            if self.use_redis:
                data = self.redis_client.get(key)
                if data:
                    return pickle.loads(data)
            else:
                return self.memory_cache.get(key)
        except Exception as e:
            print(f"Cache get error: {e}")
        return None
    
    async def set(self, key: str, value: Any, expire: int = 300):
        try:
            if self.use_redis:
                self.redis_client.setex(key, expire, pickle.dumps(value))
            else:
                self.memory_cache[key] = value
                # Simple cleanup for memory cache
                if len(self.memory_cache) > 1000:
                    # Remove oldest 100 items
                    keys_to_remove = list(self.memory_cache.keys())[:100]
                    for k in keys_to_remove:
                        del self.memory_cache[k]
        except Exception as e:
            print(f"Cache set error: {e}")

# Global cache instance
cache = CacheService()