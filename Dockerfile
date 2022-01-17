FROM node:16.13-alpine3.14

RUN npm install -g gatsby-cli

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 9000