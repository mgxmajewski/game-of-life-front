FROM node

RUN npm install -g gatsby-cli

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install && yarn cache clean
COPY . .
EXPOSE 8000
CMD ["yarn", "develop", "-H", "0.0.0.0"]