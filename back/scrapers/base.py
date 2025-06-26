# scrapers/base.py
from abc import ABC, abstractmethod
from typing import List, Optional
import aiohttp
import asyncio
from fake_useragent import UserAgent
from bs4 import BeautifulSoup
import random
from models.product import Product

class BaseScraper(ABC):
    def __init__(self):
        self.ua = UserAgent()
        self.session = None
        self.rate_limit = 1  # seconds between requests
        
    async def get_session(self):
        if not self.session:
            timeout = aiohttp.ClientTimeout(total=30)
            self.session = aiohttp.ClientSession(timeout=timeout)
        return self.session
    
    def get_headers(self):
        return {
            'User-Agent': self.ua.random,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        }
    
    async def fetch_page(self, url: str) -> Optional[str]:
        try:
            session = await self.get_session()
            await asyncio.sleep(random.uniform(0.5, self.rate_limit))
            
            async with session.get(url, headers=self.get_headers()) as response:
                if response.status == 200:
                    return await response.text()
                else:
                    print(f"Failed to fetch {url}: {response.status}")
                    return None
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            return None
    
    @abstractmethod
    async def search(self, query: str, limit: int = 5) -> List[Product]:
        pass
    
    async def close(self):
        if self.session:
            await self.session.close()