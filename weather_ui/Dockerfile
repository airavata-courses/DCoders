FROM node:17

LABEL maintainer="Chaitanya Shekhar Deshpande"

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]