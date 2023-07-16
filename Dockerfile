FROM node:alpine

WORKDIR /app

COPY package*.json .

RUN npm install -g @ionic/cli

RUN npm install

COPY . .

RUN apk --no-cache add curl

RUN npm run build

EXPOSE 8100

ENTRYPOINT [ "ionic", "serve", "--external" ]
