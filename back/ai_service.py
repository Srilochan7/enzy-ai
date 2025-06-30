# services/ai_service.py
import ollama
from typing import Dict, Any, List
import json
import re

class AIService:
    def __init__(self):
        self.model = "llama2"
        
    async def extract_product_info(self, message: str) -> Dict[str, Any]:
        """Extract structured product information from user message"""
        
        prompt = f"""
        Analyze this shopping message and extract product information in JSON format:
        Message: "{message}"
        
        Return ONLY a JSON object with these fields:
        {{
            "category": "clothing/shoes/accessories/electronics/etc",
            "product_type": "specific item like shirt, dress, phone, etc",
            "keywords": ["keyword1", "keyword2", "keyword3"],
            "filters": {{
                "gender": "men/women/unisex/null",
                "color": "color name or null",
                "size": "size or null",
                "brand": "brand name or null",
                "price_range": "budget/mid/premium/null",
                "occasion": "casual/formal/party/sports/null"
            }},
            "search_query": "optimized search string for ecommerce"
        }}
        """
        
        try:
            response = ollama.chat(
                model=self.model,
                messages=[{"role": "user", "content": prompt}]
            )
            
            # Extract JSON from response
            content = response['message']['content']
            json_match = re.search(r'\{.*\}', content, re.DOTALL)
            
            if json_match:
                return json.loads(json_match.group())
            else:
                return self._fallback_extraction(message)
                
        except Exception as e:
            print(f"AI extraction error: {e}")
            return self._fallback_extraction(message)
    
    def _fallback_extraction(self, message: str) -> Dict[str, Any]:
        """Fallback product extraction using keyword matching"""
        
        # Product type mapping
        product_types = {
            'shirt': ['shirt', 'tshirt', 't-shirt', 'blouse', 'top'],
            'dress': ['dress', 'gown', 'frock'],
            'pants': ['pants', 'trousers', 'jeans', 'chinos'],
            'shoes': ['shoes', 'sneakers', 'boots', 'sandals', 'heels'],
            'jacket': ['jacket', 'blazer', 'coat', 'hoodie'],
            'accessories': ['watch', 'bag', 'belt', 'wallet', 'jewelry']
        }
        
        # Category mapping
        categories = {
            'clothing': ['shirt', 'dress', 'pants', 'jacket', 'top', 'bottom'],
            'footwear': ['shoes', 'sneakers', 'boots', 'sandals'],
            'accessories': ['watch', 'bag', 'belt', 'wallet']
        }
        
        message_lower = message.lower()
        
        # Extract product type
        detected_type = None
        for product_type, keywords in product_types.items():
            if any(keyword in message_lower for keyword in keywords):
                detected_type = product_type
                break
        
        # Extract category
        detected_category = 'clothing'  # default
        for category, keywords in categories.items():
            if any(keyword in message_lower for keyword in keywords):
                detected_category = category
                break
        
        # Extract keywords
        keywords = []
        if detected_type:
            keywords.append(detected_type)
        
        # Add color keywords
        colors = ['red', 'blue', 'black', 'white', 'green', 'yellow', 'pink', 'purple']
        for color in colors:
            if color in message_lower:
                keywords.append(color)
        
        return {
            "category": detected_category,
            "product_type": detected_type or "clothing",
            "keywords": keywords,
            "filters": {
                "gender": self._extract_gender(message_lower),
                "color": self._extract_color(message_lower),
                "size": None,
                "brand": None,
                "price_range": self._extract_price_range(message_lower),
                "occasion": self._extract_occasion(message_lower)
            },
            "search_query": self._build_search_query(message, keywords)
        }
    
    def _extract_gender(self, message: str) -> str:
        if any(word in message for word in ['men', 'male', 'boy', 'man']):
            return 'men'
        elif any(word in message for word in ['women', 'female', 'girl', 'woman', 'ladies']):
            return 'women'
        return 'unisex'
    
    def _extract_color(self, message: str) -> str:
        colors = ['red', 'blue', 'black', 'white', 'green', 'yellow', 'pink', 'purple', 'brown', 'gray', 'orange']
        for color in colors:
            if color in message:
                return color
        return None
    
    def _extract_price_range(self, message: str) -> str:
        if any(word in message for word in ['cheap', 'budget', 'affordable', 'under']):
            return 'budget'
        elif any(word in message for word in ['expensive', 'premium', 'luxury', 'high-end']):
            return 'premium'
        return 'mid'
    
    def _extract_occasion(self, message: str) -> str:
        occasions = {
            'formal': ['formal', 'office', 'business', 'professional'],
            'casual': ['casual', 'everyday', 'regular'],
            'party': ['party', 'club', 'night', 'evening'],
            'sports': ['sports', 'gym', 'workout', 'running']
        }
        
        for occasion, keywords in occasions.items():
            if any(keyword in message for keyword in keywords):
                return occasion
        return 'casual'
    
    def _build_search_query(self, original_message: str, keywords: List[str]) -> str:
        """Build optimized search query"""
        if keywords:
            return ' '.join(keywords)
        return original_message

# Create global instance
ai_service = AIService()