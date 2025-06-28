FROM python:3.10-slim

WORKDIR /app

COPY server/ ./
COPY exports/ ./exports/

RUN pip install --no-cache-dir -r requirements.txt

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]