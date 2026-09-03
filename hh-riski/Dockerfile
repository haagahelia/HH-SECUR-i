# Use an official Node runtime as a parent image
FROM node:19-alpine AS build
# Set the working directory to /app
WORKDIR /app
# Copy the package.json and package-lock.json to the container
COPY package*.json ./
# Install dependencies
RUN npm ci
# Copy the rest of the application code to the container
COPY . .
# Build the React app
RUN npm run build

# Use a non-root nginx image to serve the React app
FROM bitnamisecure/nginx:latest
# Copy React build to nginx HTML directory 
COPY --from=build /app/dist /usr/share/nginx/html/
# Copy nginx-configuration file 
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html/
EXPOSE 8080