FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

RUN mkdir -p uploads logs

EXPOSE 3000

USER node

CMD ["npm", "start"]