# build stage
FROM node:13.12.0-alpine
RUN mkdir -p /home/node/src/node_modules
RUN chown node:node /home/node/src/node_modules
WORKDIR /home/node/src/

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "run", "start"]