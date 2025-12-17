import os
from fastapi import FastAPI

service_name = os.getenv("SERVICE_NAME", "fastapi-service")
app = FastAPI(title=service_name)

@app.get("/")
async def root():
    return {
        "service": service_name,
        "message": "Stub service running. Replace with framework implementation.",
    }
