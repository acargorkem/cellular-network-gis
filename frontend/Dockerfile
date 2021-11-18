# build stage
FROM node:13.12.0-alpine as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
COPY . ./

ARG BASE_URL
ENV REACT_APP_BASE_URL=${BASE_URL}

ARG CESIUM_ION_TOKEN
ENV REACT_APP_CESIUM_ION_TOKEN=${CESIUM_ION_TOKEN}

ENV NODE_ENV production
ENV GENERATE_SOURCEMAP false

RUN npm run build

# production stage
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html

COPY ./nginx/ /etc/nginx/

CMD ["nginx", "-g", "daemon off;"]
