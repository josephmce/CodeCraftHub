# Use official Node.js LTS image
FROM node:20

# Set working directory in container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose port the app runs on
EXPOSE 5000

# Start the Node.js application
CMD ["node", "src/index.js"]
