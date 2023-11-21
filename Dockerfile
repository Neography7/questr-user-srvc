FROM node:16.19.1-bullseye-slim

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5002

CMD ["npm", "run", "start:dev"]