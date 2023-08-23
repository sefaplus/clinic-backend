FROM node:18

WORKDIR /app

COPY ./package.json /app/.

RUN yarn

RUN yarn start:dev