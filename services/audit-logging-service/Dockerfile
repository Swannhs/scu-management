FROM python:3.12-slim
WORKDIR /app
COPY main.py .
RUN pip install --no-cache-dir fastapi uvicorn
ENV PORT=8000
ENV SERVICE_NAME=fastapi-service
EXPOSE 8000
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT}"]
