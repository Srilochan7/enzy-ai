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

ai_service = AIService()