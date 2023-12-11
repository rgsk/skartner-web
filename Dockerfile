FROM node:16.14.0-slim

RUN apt-get update
RUN apt-get install -y python3 build-essential

WORKDIR /app

COPY ./package*.json ./
COPY ./yarn.lock ./


RUN yarn

COPY ./ ./

ARG NEXT_PUBLIC_SKARTNER_SERVER
ARG NEXT_PUBLIC_APP_ENV
ARG NEXT_PUBLIC_LOCAL_IP


RUN NEXT_PUBLIC_SKARTNER_SERVER=${NEXT_PUBLIC_SKARTNER_SERVER:?error} \
    NEXT_PUBLIC_APP_ENV=${NEXT_PUBLIC_APP_ENV:?error} \
    NEXT_PUBLIC_LOCAL_IP=${NEXT_PUBLIC_LOCAL_IP} \
    yarn build

CMD ["yarn", "start"]
