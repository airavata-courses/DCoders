FROM node:17

MAINTAINER "Chaitanya Shekhar Deshpande"

RUN mkdir /app

COPY . /app
WORKDIR /app

RUN echo "Installing npm packages" && \
	npm install && \
	echo "Installation completed!"

EXPOSE 8081

CMD ["node", "gateway.js"]