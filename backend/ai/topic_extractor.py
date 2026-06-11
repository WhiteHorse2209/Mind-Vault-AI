from transformers import pipeline
import torch

# Initialize Zero-Shot Classification pipeline for topic extraction
try:
    classifier = pipeline(
        "zero-shot-classification",
        model="facebook/bart-large-mnli",
        device=0 if torch.cuda.is_available() else -1
    )
except Exception as e:
    print(f"Error loading topic extractor: {e}")
    classifier = None

# Predefined candidate labels for topic extraction
CANDIDATE_LABELS = [
    "FastAPI", "React", "TensorFlow", "Machine Learning", 
    "Project Development", "Career Preparation", "Python", 
    "Web Development", "AI", "Database", "Personal Growth", 
    "Health", "Finance", "Education", "Productivity"
]

async def extract_topics(text: str) -> list:
    """
    Extracts relevant topics from the given text.
    """
    if not classifier or not text or len(text.strip()) < 20:
        return []

    try:
        result = classifier(text, candidate_labels=CANDIDATE_LABELS, multi_label=True)
        # Return labels with scores > 0.4
        topics = [label for label, score in zip(result['labels'], result['scores']) if score > 0.4]
        return topics[:5] # Limit to top 5
    except Exception as e:
        print(f"Topic extraction error: {e}")
        return []
