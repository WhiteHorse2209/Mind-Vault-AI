from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

# Global model and tokenizer initialization
MODEL_NAME = "facebook/bart-large-cnn"
FALLBACK_MODEL = "t5-small"

device = "cuda" if torch.cuda.is_available() else "cpu"

try:
    print(f"Loading summarization model: {MODEL_NAME}")
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME).to(device)
except Exception as e:
    print(f"Error loading primary model: {e}. Falling back to {FALLBACK_MODEL}.")
    try:
        tokenizer = AutoTokenizer.from_pretrained(FALLBACK_MODEL)
        model = AutoModelForSeq2SeqLM.from_pretrained(FALLBACK_MODEL).to(device)
    except Exception as e2:
        print(f"Error loading fallback model: {e2}")
        tokenizer = None
        model = None

async def generate_summary(text: str, max_length: int = 130, min_length: int = 30) -> str:
    """
    Generates a summary for the given text using Hugging Face Transformers.
    """
    if not text or len(text.strip()) < 50:
        return text

    if not model or not tokenizer:
        return text[:150] + "..." if len(text) > 150 else text

    try:
        # T5 requires a prefix
        if "t5" in model.config._name_or_path:
            text = "summarize: " + text

        inputs = tokenizer(text, return_tensors="pt", max_length=1024, truncation=True).to(device)
        
        summary_ids = model.generate(
            inputs["input_ids"], 
            num_beams=4, 
            max_length=max_length, 
            min_length=min_length, 
            early_stopping=True
        )
        
        summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        return summary
    except Exception as e:
        print(f"Summarization error: {e}")
        return text[:150] + "..." if len(text) > 150 else text
