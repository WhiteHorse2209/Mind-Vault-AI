from typing import List, Dict
from collections import Counter

class PatternDetector:
    def __init__(self, journals: List[Dict]):
        self.journals = journals

    def detect_emotional_trends(self) -> str:
        if not self.journals:
            return "No emotional trends detected yet."

        emotions = [j.get("sentiment", "neutral") for j in self.journals]
        emotion_counts = Counter(emotions)
        
        if not emotions:
            return "No emotional data available."

        most_common = emotion_counts.most_common(1)[0][0]
        
        if most_common == "positive":
            return "You've been in a generally positive mood lately, showing resilience and optimism."
        elif most_common == "negative":
            return "You've been experiencing some challenges lately. It's okay to feel this way; reflect on what might be causing stress."
        else:
            return "Your emotional state has been steady and balanced recently."

    def detect_recurring_habits(self) -> List[str]:
        if not self.journals:
            return []

        all_topics = []
        for j in self.journals:
            all_topics.extend(j.get("topics", []))
        
        topic_counts = Counter(all_topics)
        frequent_topics = [topic for topic, count in topic_counts.items() if count >= 2]
        
        habits = []
        if "Learning" in frequent_topics or "Education" in frequent_topics:
            habits.append("You regularly dedicate time to learning and personal development.")
        if "Project Development" in frequent_topics or "Web Development" in frequent_topics:
            habits.append("You are consistently working on technical projects.")
        if "Productivity" in frequent_topics:
            habits.append("You frequently focus on optimizing your workflow and productivity.")
            
        return habits

async def detect_patterns(journals: List[Dict]) -> Dict:
    detector = PatternDetector(journals)
    return {
        "emotional_trend": detector.detect_emotional_trends(),
        "habits": detector.detect_recurring_habits()
    }
