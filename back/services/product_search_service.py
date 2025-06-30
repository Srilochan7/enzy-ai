# services/product_search_service.py
from typing import List, Dict, Any
from models.product import Product
from scrapers.amazon import AmazonScraper
from scrapers.flipkart import FlipkartScraper
from services.cache_service import cache
import asyncio
import hashlib

class ProductSearchService:
    def __init__(self):
        self.amazon_scraper = AmazonScraper()
        self.flipkart_scraper = FlipkartScraper()
        
    async def search_products(self, product_info: Dict[str, Any], limit: int = 8) -> List[Product]:
        """Search products based on extracted product information"""
        
        # Create cache key from product info
        cache_key = self._create_cache_key(product_info)
        
        # Check cache first
        cached_products = await cache.get(cache_key)
        if cached_products:
            return cached_products[:limit]
        
        # Generate multiple search queries for better coverage
        search_queries = self._generate_search_queries(product_info)
        
        # Search all platforms with all queries
        all_products = []
        
        for query in search_queries:
            tasks = [
                self.amazon_scraper.search(query, limit//2),
                self.flipkart_scraper.search(query, limit//2),
            ]
            
            try:
                results = await asyncio.gather(*tasks, return_exceptions=True)
                
                for result in results:
                    if isinstance(result, list):
                        all_products.extend(result)
                    
            except Exception as e:
                print(f"Search error for query '{query}': {e}")
        
        # Filter and rank products
        filtered_products = self._filter_and_rank_products(
            all_products, 
            product_info, 
            limit
        )
        
        # Cache results
        await cache.set(cache_key, filtered_products, expire=300)
        
        return filtered_products
    
    def _generate_search_queries(self, product_info: Dict[str, Any]) -> List[str]:
        """Generate multiple search queries for comprehensive results"""
        queries = []
        
        # Primary query from AI
        if product_info.get('search_query'):
            queries.append(product_info['search_query'])
        
        # Product type + filters
        base_query = product_info.get('product_type', '')
        filters = product_info.get('filters', {})
        
        # Add gender filter
        if filters.get('gender') and filters['gender'] != 'unisex':
            queries.append(f"{filters['gender']} {base_query}")
        
        # Add color filter
        if filters.get('color'):
            queries.append(f"{filters['color']} {base_query}")
            if filters.get('gender'):
                queries.append(f"{filters['gender']} {filters['color']} {base_query}")
        
        # Add occasion filter
        if filters.get('occasion'):
            queries.append(f"{filters['occasion']} {base_query}")
        
        # Keyword combinations
        keywords = product_info.get('keywords', [])
        if len(keywords) > 1:
            queries.append(' '.join(keywords[:3]))
        
        # Remove duplicates and empty queries
        queries = list(set([q.strip() for q in queries if q.strip()]))
        
        return queries[:4]  # Limit to 4 queries to avoid too many requests
    
    def _filter_and_rank_products(self, products: List[Product], product_info: Dict[str, Any], limit: int) -> List[Product]:
        """Filter and rank products based on relevance"""
        
        if not products:
            return []
        
        # Remove duplicates
        unique_products = self._remove_duplicates(products)
        
        # Score products based on relevance
        scored_products = []
        for product in unique_products:
            score = self._calculate_relevance_score(product, product_info)
            scored_products.append((product, score))
        
        # Sort by score (descending) and return top results
        scored_products.sort(key=lambda x: x[1], reverse=True)
        
        return [product for product, score in scored_products[:limit]]
    
    def _remove_duplicates(self, products: List[Product]) -> List[Product]:
        """Remove duplicate products based on name similarity"""
        unique_products = []
        seen_names = set()
        
        for product in products:
            # Create a normalized name for comparison
            normalized_name = ''.join(product.name.lower().split())[:50]
            
            if normalized_name not in seen_names:
                seen_names.add(normalized_name)
                unique_products.append(product)
        
        return unique_products
    
    def _calculate_relevance_score(self, product: Product, product_info: Dict[str, Any]) -> float:
        """Calculate relevance score for a product"""
        score = 0.0
        
        product_name_lower = product.name.lower()
        
        # Check product type match
        product_type = product_info.get('product_type', '')
        if product_type and product_type.lower() in product_name_lower:
            score += 3.0
        
        # Check keyword matches
        keywords = product_info.get('keywords', [])
        for keyword in keywords:
            if keyword.lower() in product_name_lower:
                score += 2.0
        
        # Check filter matches
        filters = product_info.get('filters', {})
        
        # Gender match
        if filters.get('gender') and filters['gender'] != 'unisex':
            if filters['gender'].lower() in product_name_lower:
                score += 1.5
        
        # Color match
        if filters.get('color'):
            if filters['color'].lower() in product_name_lower:
                score += 1.5
        
        # Occasion match
        if filters.get('occasion'):
            if filters['occasion'].lower() in product_name_lower:
                score += 1.0
        
        # Price availability bonus
        if product.price and product.price != "Price not available":
            score += 0.5
        
        # Rating bonus (if available)
        if hasattr(product, 'rating') and product.rating:
            try:
                rating_value = float(product.rating.split()[0])
                if rating_value >= 4.0:
                    score += 0.5
            except:
                pass
        
        return score
    
    def _create_cache_key(self, product_info: Dict[str, Any]) -> str:
        """Create cache key from product info"""
        key_data = {
            'product_type': product_info.get('product_type'),
            'category': product_info.get('category'),
            'search_query': product_info.get('search_query'),
            'filters': product_info.get('filters', {})
        }
        
        key_string = str(sorted(key_data.items()))
        return f"products:{hashlib.md5(key_string.encode()).hexdigest()}"
    
    async def close(self):
        """Close scraper connections"""
        await self.amazon_scraper.close()
        await self.flipkart_scraper.close()

# Create global instance
product_search_service = ProductSearchService()