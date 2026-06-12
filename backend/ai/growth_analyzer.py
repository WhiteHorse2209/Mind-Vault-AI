from typing import List, Dict
from datetime import datetime

class GrowthAnalyzer:
    def __init__(self, journals: List[Dict]):
        # Sort journals by date
        self.journals = sorted(journals, key=lambda x: x.get("created_at", datetime.min))

    def analyze_growth(self) -> str:
        if len(self.journals) < 2:
            return "Keep writing more entries to see your growth analysis over time!"

        first_half = self.journals[:len(self.journals)//2]
        second_half = self.journals[len(self.journals)//2:]

        # Simple logic: Compare sentiment/complexity (placeholder for now)
        # In a real scenario, we'd use LLM to compare themes
        
        first_sentiment = self._average_sentiment(first_half)
        second_sentiment = self._average_sentiment(second_half)

        if second_sentiment > first_sentiment:
            return "Compared to your earlier entries, your confidence has increased and you seem to be approaching challenges with a more positive mindset."
        elif second_sentiment < first_sentiment:
            return "Your recent entries show you're navigating a more complex or challenging period compared to before. This is a natural part of growth."
        else:
            return "You have maintained a consistent level of focus and emotional stability throughout your journey."

    def _average_sentiment(self, journals: List[Dict]) -> float:
        sentiment_map = {"positive": 1.0, "neutral": 0.5, "negative": 0.0}
        total = sum(sentiment_map.get(j.get("sentiment", "neutral"), 0.5) for j in journals)
        return total / len(journals) if journals else 0.5

async def analyze_growth(journals: List[Dict]) -> str:
    analyzer = GrowthAnalyzer(journals)
    return analyzer.analyze_growth()
