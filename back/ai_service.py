# ai_service.py
import ollama

class AIAssistant:
    def __init__(self):
        self.model = "llama2"  # or llama3.1
    
    def extract_shopping_intent(self, message):
        prompt = f"""
        Extract shopping information from: "{message}"
        Return JSON with: product_type, occasion, color, size, budget
        """
        response = ollama.generate(model=self.model, prompt=prompt)
        return self.parse_response(response)