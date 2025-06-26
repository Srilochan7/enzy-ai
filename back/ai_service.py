# ai_service.py
import ollama
class AIService:
    def detect_shopping_intent(self, message: str) -> bool:
        # Make this more aggressive - detect any product-related keywords
        shopping_keywords = [
            'shoes', 'shirt', 'dress', 'pants', 'jacket', 'buy', 'need', 
            'looking for', 'want', 'show me', 'find', 'search', 'marathon',
            'running', 'formal', 'casual', 'wedding', 'party'
        ]
        
        message_lower = message.lower()
        return any(keyword in message_lower for keyword in shopping_keywords)
    
    async def chat(self, message: str) -> str:
        # Keep AI responses short and focused
        if self.detect_shopping_intent(message):
            return "Here are the best products I found for you:"
        else:
            return "I'm here to help you find products! What are you looking for?"