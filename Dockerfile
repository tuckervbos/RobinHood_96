FROM python:3.9.18-alpine3.18

RUN apk add build-base

RUN apk add postgresql-dev gcc python3-dev musl-dev
# RUN apk add --no-cache build-base postgresql-dev gcc python3-dev musl-dev
# WORKDIR /var/www
ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY
ARG DEEPSEEK_API_KEY

WORKDIR /var/www

COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install psycopg2
RUN pip install openai

COPY . .

CMD ["sh", "-c", "flask db upgrade && gunicorn app:app"]