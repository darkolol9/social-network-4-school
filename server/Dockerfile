FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy source AFTER install so node_modules stays inside image
COPY . .

EXPOSE 3000

# Use tsx from local dependencies (not global)
CMD ["npm", "run", "dev"]

