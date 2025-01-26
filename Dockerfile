# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Download wait-for-it.sh script needed if the postgres taking time to start
RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/src/app/wait-for-it.sh && \
    chmod +x /usr/src/app/wait-for-it.sh

# Copy the rest of the app files
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the app
CMD ["/usr/src/app/wait-for-it.sh", "postgres:5432", "--", "npm", "run", "start"]