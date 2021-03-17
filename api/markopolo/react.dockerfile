FROM node:latest

WORKDIR /app

COPY ./marko-front ./

RUN npm install --silent 

CMD ["npm","start"]
