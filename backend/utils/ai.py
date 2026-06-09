import random

async def analyze_journal_content(content: str) -> dict:
    """
    Simulates AI analysis of journal content.
    In a real application, this would call an LLM API (OpenAI, Gemini, etc.)
    """
    moods = ["Positive", "Reflective", "Neutral", "Anxious", "Determined"]
    insights = [
        "You seem to be focusing on personal growth today.",
        "It's great to see you expressing gratitude in your writing.",
        "Take a moment to breathe; your writing suggests some tension.",
        "You're making clear progress on your goals.",
        "This entry shows a deep level of self-awareness."
    ]
    
    # Simple logic to make it feel a bit more real
    if "happy" in content.lower() or "great" in content.lower():
        mood = "Positive"
        insight = "Your positivity is contagious! Keep capturing these good moments."
    elif "sad" in content.lower() or "down" in content.lower():
        mood = "Reflective"
        insight = "It's okay to have down days. Writing about them is a great step toward feeling better."
    else:
        mood = random.choice(moods)
        insight = random.choice(insights)
        
    return {
        "mood": mood,
        "ai_insight": insight
    }
