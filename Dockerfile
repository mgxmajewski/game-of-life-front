FROM node:16.13-alpine3.14

RUN npm install -g gatsby-cli

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 9000
CMD ["gatsby", "build"]
CMD ["gatsby", "serve", "-H", "0.0.0.0"]
