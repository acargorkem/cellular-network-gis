# build environment
FROM node:13.12.0-alpine as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./

ARG BASE_URL
ENV REACT_APP_BASE_URL=${BASE_URL}

ARG CESIUM_ION_TOKEN
ENV REACT_APP_CESIUM_ION_TOKEN=${CESIUM_ION_TOKEN}

ENV NODE_ENV production

RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

