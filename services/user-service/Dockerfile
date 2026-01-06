FROM node:18-alpine
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Set environment (if any) and expose port
ENV NODE_ENV=production
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
