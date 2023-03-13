FROM --platform=linux/amd64 python:3.9-slim-buster
WORKDIR /app
# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /app
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
ENV FLASK_APP=app.py
# CMD ["flask", "run", "--host", "0.0.0.0"]
CMD ["gunicorn", "-b", "0.0.0.0:5000", "wsgi:app"]