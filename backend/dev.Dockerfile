# build stage
FROM node:12-stretch as builder
WORKDIR /build
COPY package.json package-lock.json ./

RUN npm ci
COPY . .

# runtime stage
FROM alpine:3.10
RUN apk add --update nodejs
RUN apk add --update npm
RUN addgroup -S node && adduser -S node -G node
USER node

RUN mkdir /home/node/src
WORKDIR /home/node/src
COPY --from=builder --chown=node:node /build .

EXPOSE 5000

CMD [ "npm", "run", "dev" ]
