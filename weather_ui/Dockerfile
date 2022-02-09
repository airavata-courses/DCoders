FROM alpine

LABEL maintainer="Chaitanya Shekhar Deshpande"

RUN apk add --update nodejs npm

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]