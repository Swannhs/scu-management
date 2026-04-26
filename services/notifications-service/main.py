from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello from Notifications Service"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/ready")
def ready():
    return {"status": "ok"}
