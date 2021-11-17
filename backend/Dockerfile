
# build stage
FROM node:12-stretch as builder
WORKDIR /build
COPY package.json package-lock.json ./

ENV NODE_ENV production

RUN npm ci
COPY . .

# runtime stage
FROM alpine:3.10
RUN apk add --update nodejs
RUN addgroup -S node && adduser -S node -G node
USER node

RUN mkdir /home/node/src
WORKDIR /home/node/src
COPY --from=builder --chown=node:node /build .

CMD [ "node", "index.js" ]