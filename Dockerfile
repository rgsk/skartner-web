FROM node:16.14.0-slim

WORKDIR /app

COPY ./package*.json ./
COPY ./yarn.lock ./


RUN yarn

COPY ./ ./


ARG SKARTNER_WEB_APP_ENV
ARG LOCAL_IP

RUN NEXT_PUBLIC_APP_ENV=${SKARTNER_WEB_APP_ENV} \
    NEXT_PUBLIC_LOCAL_IP=${LOCAL_IP} \
    yarn build

CMD ["yarn", "start"]
