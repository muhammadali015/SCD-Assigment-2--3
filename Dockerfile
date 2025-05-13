# Use Node 16 LTS as the base image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["node", "app.js"] 