FROM node:10 AS builder
WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY ./public ./public
COPY ./src ./src

RUN npm install
RUN npm run build


FROM nginx:1.17
EXPOSE 8000

COPY ./nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html
