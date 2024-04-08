FROM node:20.11.1

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install
RUN npm run build
COPY . .

CMD ["npm","run", "start:dev"]
