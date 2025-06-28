from fastapi import Body, FastAPI, Request
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
from typing import Annotated
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = ["http://localhost:5173", "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = AutoModelForSequenceClassification.from_pretrained("./exports/model")
tokenizer = AutoTokenizer.from_pretrained("./exports/tokenizer")

label_list = ["AGREE", "DM", "MM", "ROS", "PR", "PAR", "FRAG", "CASE", "NONE"]


@app.get("/")
async def root():
    if (model != None and tokenizer != None):
        return {"status":"running"}
    else: 
        return {"status":"error loading either the model or the tokenizer"}
class Sentence(BaseModel):
    sentence: str

@app.post("/classify")
async def classify(sentence: Sentence):
    inputs = tokenizer(sentence.sentence, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        output = model(**inputs)
    logits = output.logits
    prediction = logits.argmax(dim=1).tolist()
    predicted_label = label_list[prediction[0]]
    return {"classification": predicted_label}