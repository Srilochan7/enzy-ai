# scrapers/base_scraper.py
from abc import ABC, abstractmethod
import requests
from bs4 import BeautifulSoup

class BaseScraper(ABC):
    @abstractmethod
    def search(self, query: str) -> list:
        pass

# scrapers/amazon_scraper.py
class AmazonScraper(BaseScraper):
    def search(self, query: str):
        # Use requests + BeautifulSoup
        # Handle anti-bot measures with headers/delays
        pass

# Similar for Flipkart, Myntra