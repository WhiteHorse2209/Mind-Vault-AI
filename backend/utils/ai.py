from transformers import pipeline

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
    Analyzes journal content for emotion and sentiment using Hugging Face transformers.
    """
    
    # Analyze emotion
    emotion_result = emotion_classifier(content)[0][0]
    
    # Analyze sentiment
    sentiment_result = sentiment_analyzer(content)[0]
    
    return {
        "emotion": emotion_result["label"],
        "score": round(emotion_result["score"], 2),
        "sentiment": sentiment_result["label"].lower()
    }
