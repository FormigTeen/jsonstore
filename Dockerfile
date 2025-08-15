FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

RUN npm install -g pm2

ENV NODE_ENV=production
EXPOSE 3000
CMD ["pm2-runtime", "server.js", "-i", "max"]
