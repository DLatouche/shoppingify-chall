FROM node:latest

WORKDIR /usr/src/app

COPY ./server ./

RUN npm install

EXPOSE 1001

CMD ["npm", "start"]