import aiohttp

class AIService:
    def __init__(self):
        self.ollama_url = "http://localhost:11434/api/generate"
        self.model = "llama3.2"
    
    async def chat(self, message: str) -> str:
        try:
            async with aiohttp.ClientSession() as session:
                payload = {
                    "model": self.model,
                    "prompt": f"You are a fashion assistant. User said: '{message}'. Respond helpfully about shopping.",
                    "stream": False
                }
                
                async with session.post(self.ollama_url, json=payload) as response:
                    if response.status == 200:
                        data = await response.json()
                        return data.get('response', '').strip()
        except:
            pass
        
        return "Great! I'll help you find the perfect outfit. Let me search for some options!"
    
    def detect_shopping_intent(self, message: str) -> bool:
        keywords = ['buy', 'shop', 'dress', 'shirt', 'tuxedo', 'suit', 'wedding', 'formal']
        return any(keyword in message.lower() for keyword in keywords)
    
    
    # Add this method to AIService class in ai_service.py

async def generate_response(self, message: str, product_info: Dict[str, Any], product_count: int) -> str:
    """Generate contextual AI response based on product search results"""
    
    if product_count == 0:
        return "I couldn't find exactly what you're looking for, but let me search with different terms! 🔍"
    
    product_type = product_info.get('product_type', 'items')
    
    responses = [
        f"Found {product_count} great {product_type} options for you! ✨",
        f"Here are {product_count} perfect {product_type} matches! 🛍️",
        f"Check out these {product_count} amazing {product_type}! 🔥",
        f"I found {product_count} {product_type} that match your style! 💫",
        f"Perfect! Here are {product_count} {product_type} just for you! 👌"
    ]
    
    import random
    return random.choice(responses)

ai_service = AIService()