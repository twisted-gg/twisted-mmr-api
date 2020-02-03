FROM node:13.0.1

WORKDIR /app

COPY ./package*.json ./

RUN npm i --production

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
