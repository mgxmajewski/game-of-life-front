FROM node:16.13-alpine3.14

RUN npm install -g gatsby-cli

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
CMD ["gatsby", "build"]
EXPOSE 9000
