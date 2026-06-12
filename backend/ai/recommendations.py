from typing import List, Dict

class RecommendationEngine:
    def __init__(self, patterns: Dict, journals: List[Dict]):
        self.patterns = patterns
        self.journals = journals

    def generate_recommendations(self) -> List[str]:
        recommendations = []
        
        emotional_trend = self.patterns.get("emotional_trend", "")
        habits = self.patterns.get("habits", [])
        
        if "challenges" in emotional_trend or "stress" in emotional_trend:
            recommendations.append("Consider breaking large projects into smaller milestones since your entries indicate stress increases when deadlines approach.")
        
        if "positive" in emotional_trend:
            recommendations.append("You're in a great flow! Try to document what's working well so you can replicate this state in the future.")

        if any("learning" in h.lower() for h in habits):
            recommendations.append("You perform well when maintaining a consistent study routine. Consider scheduling dedicated learning blocks each day.")
            
        if not recommendations:
            recommendations.append("Continue your daily journaling practice to gather more data for personalized recommendations.")
            recommendations.append("Set clear, achievable goals for the upcoming week to maintain your momentum.")

        return recommendations

async def get_recommendations(patterns: Dict, journals: List[Dict]) -> List[str]:
    engine = RecommendationEngine(patterns, journals)
    return engine.generate_recommendations()
