FROM python:3.7.5
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN pip3 install -r requirements.txt
CMD python3 server.py
