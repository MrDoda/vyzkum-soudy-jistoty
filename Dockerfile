# Use the official Node.js 18 image as a parent image
FROM node:18

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY SoudyJistotyBE/package*.json ./

# Install dependencies in the image
RUN npm install

# Copy the rest of your app's source code from your host to the image's filesystem
COPY SoudyJistotyBE/ ./

# Transpile your ES6+ source code to plain JavaScript
RUN npm run build

# Your application's default port might be 3000. If it's different, change accordingly
EXPOSE 8080

# The command to run your application
CMD [ "npm", "run", "start:prod" ]