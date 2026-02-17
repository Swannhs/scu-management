FROM node:20-alpine
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install --legacy-peer-deps

# Copy source code and build
COPY . .
RUN npx prisma generate
RUN npm run build

# Set environment (if any) and expose port
ENV NODE_ENV=production
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
