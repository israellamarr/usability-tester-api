FROM node:9

RUN mkdir -p /usr/src/app-server
WORKDIR /usr/src/app-server
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-server
RUN npm run build-tests
EXPOSE 80
CMD [ "npm", "start"]