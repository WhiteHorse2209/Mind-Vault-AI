from transformers import pipeline
import torch

# Global model initialization
try:
    summarizer = pipeline(
        "summarization",
        model="facebook/bart-large-cnn",
        device=0 if torch.cuda.is_available() else -1
    )
except Exception as e:
    print(f"Error loading primary model: {e}. Falling back to t5-small.")
    summarizer = pipeline(
        "summarization",
        model="t5-small",
        device=0 if torch.cuda.is_available() else -1
    )

async def generate_summary(text: str, max_length: int = 130, min_length: int = 30) -> str:
    """
    Generates a summary for the given text using Hugging Face Transformers.
    """
    if not text or len(text.strip()) < 50:
        return text

    try:
        summary = summarizer(text, max_length=max_length, min_length=min_length, do_sample=False)
        return summary[0]['summary_text']
    except Exception as e:
        print(f"Summarization error: {e}")
        return text[:150] + "..." if len(text) > 150 else text
