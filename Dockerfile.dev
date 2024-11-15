FROM node:20.18.0

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["sh", "-c", "npm run dev & npm run db:preview"]