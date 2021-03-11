FROM node:14-alpine

RUN mkdir /app
WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./

CMD ["npm", "start"]
