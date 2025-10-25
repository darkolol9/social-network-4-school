FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy everything (but will be overridden by volume for dev)
COPY . .

# Install nodemon globally for hot reload
RUN npm install -g nodemon

EXPOSE 3000

CMD ["npm", "run", "dev"]

