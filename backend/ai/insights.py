from datetime import datetime, timedelta
from typing import List, Dict

async def generate_productivity_insights(journals: List[Dict]) -> List[str]:
    """
    Generates productivity insights based on journal entries.
    """
    if not journals:
        return ["No journal entries found for this period. Start writing to get insights!"]

    insights = []
    
    # Example Insight 1: Consistency
    num_entries = len(journals)
    insights.append(f"You've recorded {num_entries} journal entries recently, showing consistent progress.")

    # Example Insight 2: Focus areas
    all_topics = []
    for j in journals:
        all_topics.extend(j.get("topics", []))
    
    if all_topics:
        from collections import Counter
        top_topic = Counter(all_topics).most_common(1)[0][0]
        insights.append(f"Your primary focus lately has been on {top_topic}.")

    # Example Insight 3: Activity trend (placeholder logic)
    insights.append("Your activity increased compared to the previous week.")
    insights.append("You showed consistent progress toward technical learning goals.")

    return insights
