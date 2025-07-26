from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from typing import List
from app.controller.ai_controller import (
    print_hello, getperson, Person,
     detectDisease
)
from fastapi.middleware.cors import CORSMiddleware

import torch
import tensorflow as tf
import shutil
import os
from uuid import uuid4
import tensorflow as tf
print(tf.config.list_physical_devices('GPU'))

app = FastAPI()

# Allow React frontend (Vite runs at 5173 by default)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] to allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 🧠 Show system info on startup
print("🔍 GPU Info")
print("━━━━━━━━━━━━━━━━━━━━━")
print(f"✅ PyTorch CUDA available: {torch.cuda.is_available()}")
print(f"🧠 PyTorch Device Count: {torch.cuda.device_count()}")
print(f"⚙️ PyTorch Device Name: {torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'No GPU'}")
print(f"🧠 TensorFlow Physical Devices: {tf.config.list_physical_devices('GPU')}")
print("━━━━━━━━━━━━━━━━━━━━━")

# 🌐 Routes
@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI"}

@app.get("/hello")
def get_hello():
    return print_hello()

@app.post("/person")
def get_person(person: Person):
    return getperson(person)


@app.post('/ai/getplantdisease')
async def get_disease(file: UploadFile = File(...)):
    print("api hittted")
    temp_path = f"temp_{uuid4().hex}.jpg"
    with open(temp_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    result = detectDisease(temp_path)
    os.remove(temp_path)
    return result
