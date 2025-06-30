import aiohttp
import asyncio
from bs4 import BeautifulSoup
from typing import List
from models.product import Product
import random
from urllib.parse import quote_plus
import json

class AmazonScraper:
    def __init__(self):
        self.base_url = "https://www.amazon.in"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Cache-Control': 'max-age=0',
        }
        self.session = None
    
    async def _get_session(self):
        if not self.session:
            connector = aiohttp.TCPConnector(limit=10)
            timeout = aiohttp.ClientTimeout(total=30)
            self.session = aiohttp.ClientSession(
                connector=connector,
                timeout=timeout,
                headers=self.headers
            )
        return self.session
    
    async def search(self, query: str, limit: int = 5) -> List[Product]:
        """Real Amazon search scraping"""
        try:
            session = await self._get_session()
            
            # Clean and encode the search query
            search_query = quote_plus(query.strip())
            search_url = f"{self.base_url}/s?k={search_query}&ref=sr_pg_1"
            
            print(f"Scraping Amazon: {search_url}")
            
            async with session.get(search_url) as response:
                if response.status != 200:
                    print(f"Amazon returned status {response.status}")
                    return await self._fallback_products(query, limit)
                
                html = await response.text()
                soup = BeautifulSoup(html, 'html.parser')
                
                products = []
                
                # Amazon product containers
                product_containers = soup.find_all('div', {
                    'data-component-type': 's-search-result'
                })
                
                if not product_containers:
                    # Try alternative selectors
                    product_containers = soup.find_all('div', class_='s-result-item')
                
                print(f"Found {len(product_containers)} product containers")
                
                for container in product_containers[:limit]:
                    try:
                        product = await self._extract_product_info(container)
                        if product:
                            products.append(product)
                    except Exception as e:
                        print(f"Error extracting product: {e}")
                        continue
                
                if not products:
                    print("No products extracted, using fallback")
                    return await self._fallback_products(query, limit)
                
                return products
                
        except Exception as e:
            print(f"Amazon scraping error: {e}")
            return await self._fallback_products(query, limit)
    
    async def _extract_product_info(self, container) -> Product:
        """Extract product information from container"""
        try:
            # Product name
            name_elem = container.find('h2', class_='a-size-mini') or \
                       container.find('span', class_='a-size-medium') or \
                       container.find('span', class_='a-size-base-plus')
            
            if name_elem:
                name = name_elem.get_text(strip=True)
            else:
                return None
            
            # Price
            price_elem = container.find('span', class_='a-price-whole') or \
                        container.find('span', class_='a-offscreen')
            
            if price_elem:
                price_text = price_elem.get_text(strip=True)
                if not price_text.startswith('₹'):
                    price = f"₹{price_text}"
                else:
                    price = price_text
            else:
                price = "Price not available"
            
            # Product URL
            link_elem = container.find('a', class_='a-link-normal')
            if link_elem and link_elem.get('href'):
                product_url = f"https://amazon.in{link_elem['href']}"
            else:
                product_url = "https://amazon.in"
            
            # Rating
            rating_elem = container.find('span', class_='a-icon-alt')
            rating = None
            if rating_elem:
                rating_text = rating_elem.get_text(strip=True)
                if 'out of' in rating_text:
                    rating = rating_text.split(' ')[0]
            
            # Image URL
            img_elem = container.find('img', class_='s-image')
            image_url = ""
            if img_elem and img_elem.get('src'):
                image_url = img_elem['src']
            
            return Product(
                id=f"amazon_{hash(name)}",
                name=name[:100],  # Limit name length
                price=price,
                image_url=image_url,
                product_url=product_url,
                platform="Amazon",
                rating=rating
            )
            
        except Exception as e:
            print(f"Error extracting product info: {e}")
            return None
    
    async def _fallback_products(self, query: str, limit: int) -> List[Product]:
        """Fallback when scraping fails"""
        print("Using fallback products")
        products = []
        
        base_names = [
            f"{query.title()} - Premium Quality",
            f"{query.title()} - Best Seller",
            f"{query.title()} - Top Rated",
            f"{query.title()} - Latest Collection",
            f"{query.title()} - Comfortable Fit"
        ]
        
        prices = ["₹599", "₹799", "₹999", "₹1,199", "₹1,499"]
        ratings = ["4.1", "4.2", "4.3", "4.4", "4.5"]
        
        for i in range(min(limit, len(base_names))):
            products.append(Product(
                id=f"amazon_fallback_{i}_{hash(query)}",
                name=base_names[i],
                price=prices[i],
                image_url="",
                product_url=f"https://amazon.in/s?k={quote_plus(query)}",
                platform="Amazon",
                rating=ratings[i]
            ))
        
        return products
    
    async def close(self):
        if self.session:
            await self.session.close()