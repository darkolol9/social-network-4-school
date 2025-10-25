FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

# Install tsx for dev TS execution
RUN npm install -g tsx

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

