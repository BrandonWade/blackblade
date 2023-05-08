FROM node:19-alpine AS builder
WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY ./index.html ./index.html
COPY ./vite.config.js ./vite.config.js
COPY ./src ./src

RUN npm install
RUN npm run build


FROM nginx:1.19-alpine
EXPOSE 8200

COPY ./nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html
