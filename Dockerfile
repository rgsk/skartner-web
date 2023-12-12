FROM python:3.9-slim

WORKDIR /app

COPY ./out ./

CMD ["python","-m","http.server","3000"]