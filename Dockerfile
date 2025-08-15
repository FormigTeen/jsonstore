# ---------- Build ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Yarn moderno
RUN corepack enable

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# ---------- Runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000

# PM2
RUN corepack enable && yarn global add pm2

# Copia apenas o necessário do standalone
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# PM2 config para cluster mode
# (script é o server.js gerado pelo standalone)
COPY <<'EOF' /app/ecosystem.config.js
module.exports = {
  apps: [{
    name: 'nextapp',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: { NODE_ENV: 'production', PORT: 3000 }
  }]
}
EOF

EXPOSE 3000
CMD ["pm2-runtime", "ecosystem.config.js"]
