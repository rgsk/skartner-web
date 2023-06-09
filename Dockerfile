FROM node:16.14.0-slim

RUN apt-get update
RUN apt-get install -y python3 build-essential

WORKDIR /app

COPY ./package*.json ./
COPY ./yarn.lock ./


RUN yarn

COPY ./ ./

ARG SKARTNER_WEB_SKARTNER_SERVER
ARG SKARTNER_WEB_APP_ENV
ARG LOCAL_IP


RUN NEXT_PUBLIC_SKARTNER_SERVER=${SKARTNER_WEB_SKARTNER_SERVER:?error} \
    NEXT_PUBLIC_APP_ENV=${SKARTNER_WEB_APP_ENV:?error} \
    NEXT_PUBLIC_LOCAL_IP=${LOCAL_IP:?error} \
    yarn build

CMD ["yarn", "start"]
