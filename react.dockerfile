FROM node:latest

WORKDIR /app


RUN npm install 

ENV PATH="./node_modules/.bin:$PATH"

CMD ls && npm start 

