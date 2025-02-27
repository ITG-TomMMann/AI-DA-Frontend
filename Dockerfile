# Use a lightweight Node.js image as the base
FROM node:16-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your project files
COPY . .

# Build the React app for production
RUN npm run build

# Install a simple static server to serve the build output
RUN npm install -g serve

# Expose the port (adjust if your app runs on a different port)
EXPOSE 3000

# Command to run the app using the serve package
CMD ["serve", "-s", "build", "-l", "3000"]
