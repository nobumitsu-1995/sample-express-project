# ビルド用コンテナ
FROM node:22.14.0 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY . .

RUN npm ci
RUN npm run build

# 実行用コンテナ
FROM node:22.14.0-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/package-lock.json ./

RUN npm ci --only=production

CMD ["npm", "run", "start"]