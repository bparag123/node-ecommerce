FROM node:17

#This is a working diretory setup
WORKDIR /src/app

COPY package*.json ./

#here npm ci will install the dependency as same as given in package.json
RUN npm ci

# Copying the Current Directory to Working Directory
COPY . .


CMD [ "npm", "run", "docker" ]