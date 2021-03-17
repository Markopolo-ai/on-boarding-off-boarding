FROM python:3

ENV PYTHONUNBUFFERED=1

WORKDIR /app 

COPY ./api/markopolo/requirements.txt /app

RUN pip install -r requirements.txt 

COPY ./api/markopolo/ ./

CMD ["python","manage.py","runserver","0.0.0.0:8000"]
