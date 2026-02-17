FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate

FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --only=production --legacy-peer-deps

COPY --from=builder /app/index.js ./index.js
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client

EXPOSE 3000
CMD ["node", "index.js"]
