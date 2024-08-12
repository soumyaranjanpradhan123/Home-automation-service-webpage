# Use the official NGINX image as a base
FROM nginx:latest

# Copy your website's files into the NGINX web directory
COPY ./ /usr/share/nginx/html

# Expose port 80
EXPOSE 80
