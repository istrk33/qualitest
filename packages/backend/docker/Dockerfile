FROM node:20.5-alpine AS builder

# RUN apk update && apk add bash

RUN mkdir /app && chown node:node /app

# Docker working directory
WORKDIR /app

USER node

# Copying file into APP directory of docker
COPY --chown=node:node ./package.json ./package.json
COPY --chown=node:node ./yarn.lock  ./yarn.lock 

# Then install the NPM modules
RUN yarn install

# Copy current directory to APP folder 
COPY --chown=node:node . .

# Change the owner to the node user
# USER node

EXPOSE 3000

CMD ["yarn", "run", "start:dev"]