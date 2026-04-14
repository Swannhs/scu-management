# Use Node.js LTS version as base image
FROM node:18 AS builder

# Set the working directory in the container
WORKDIR /app

# Expose the port for development server
EXPOSE 3000

# Command to start the app in development mode
CMD ["npm", "run", "dev"]
