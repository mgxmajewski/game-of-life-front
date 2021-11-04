FROM node

RUN npm install -g gatsby-cli

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install && yarn cache clean
COPY . .
EXPOSE 9000
CMD ["gatsby", "build"]
CMD ["gatsby", "serve", "-H", "0.0.0.0"]