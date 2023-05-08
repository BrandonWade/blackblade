FROM node:19-alpine AS builder
WORKDIR /app

COPY ./package.json .
COPY ./.babelrc .
COPY ./package-lock.json .
COPY ./src ./src

RUN npm install
RUN npm run build


FROM node:19-alpine
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD ["node", "./dist/bin/www.js"]
