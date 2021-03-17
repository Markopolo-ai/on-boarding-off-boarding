FROM node:latest

WORKDIR /app

RUN npm install react-scripts@4.0.3 -g 

CMD npm install && npm start 
