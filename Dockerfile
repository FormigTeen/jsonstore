FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN yarn

COPY . .
RUN yarn build

RUN yarn global pm2

ENV NODE_ENV=production
EXPOSE 3000
CMD ["pm2-runtime", "server.js", "-i", "max"]
