from transformers import pipeline
from ai.summarizer import generate_summary
from ai.topic_extractor import extract_topics

# Initialize pipelines globally to load models only once
# Emotion classifier
emotion_classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=1
)

# Sentiment analyzer
sentiment_analyzer = pipeline(
    "sentiment-analysis"
)

async def analyze_journal_content(content: str) -> dict:
    """
    Analyzes journal content for emotion, sentiment, summary, and topics.
    """
    
    # Analyze emotion
    emotion_result = emotion_classifier(content)[0][0]
    
    # Analyze sentiment
    sentiment_result = sentiment_analyzer(content)[0]
    
    # Generate summary
    summary = await generate_summary(content)
    
    # Extract topics
    topics = await extract_topics(content)
    
    return {
        "emotion": emotion_result["label"],
        "score": round(emotion_result["score"], 2),
        "sentiment": sentiment_result["label"].lower(),
        "summary": summary,
        "topics": topics
    }
