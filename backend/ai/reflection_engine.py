from typing import List, Dict
from ai.pattern_detector import detect_patterns
from ai.growth_analyzer import analyze_growth
from ai.recommendations import get_recommendations
from langchain_core.prompts import PromptTemplate
# We will use a placeholder for the actual LLM integration to keep it modular
# In a real setup, this would use Ollama or HuggingFace local models

class ReflectionEngine:
    def __init__(self):
        # Placeholder for LLM. In production, this would be Gemma/Llama/Mistral
        self.llm = None 

    async def generate_reflection(self, journals: List[Dict], period: str = "weekly") -> Dict:
        if not journals:
            return {
                "reflection": f"No entries found for the {period} period. Start journaling to see your reflections!",
                "patterns": {},
                "growth": "",
                "recommendations": []
            }

        # 1. Detect Patterns
        patterns = await detect_patterns(journals)
        
        # 2. Analyze Growth
        growth = await analyze_growth(journals)
        
        # 3. Get Recommendations
        recommendations = await get_recommendations(patterns, journals)
        
        # 4. Generate the main reflection text (LLM-based or sophisticated heuristic)
        # For now, we use a structured heuristic that can be enhanced by an LLM
        reflection_text = self._compose_reflection(patterns, growth, period)

        return {
            "reflection": reflection_text,
            "patterns": patterns,
            "growth": growth,
            "recommendations": recommendations,
            "period": period
        }

    def _compose_reflection(self, patterns: Dict, growth: str, period: str) -> str:
        trend = patterns.get("emotional_trend", "")
        habits = patterns.get("habits", [])
        
        habit_str = " ".join(habits) if habits else "You are building a consistent journaling habit."
        
        if period == "weekly":
            return f"This week, {trend} {habit_str} {growth}"
        elif period == "monthly":
            return f"Over the past month, {trend} {habit_str} {growth}"
        else:
            return f"In your journey so far, {trend} {habit_str} {growth}"

reflection_engine = ReflectionEngine()

async def get_reflection(journals: List[Dict], period: str = "weekly") -> Dict:
    return await reflection_engine.generate_reflection(journals, period)
