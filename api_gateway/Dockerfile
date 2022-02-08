FROM node:17

MAINTAINER "Chaitanya Shekhar Deshpande"

RUN mkdir /app

COPY . /app
WORKDIR /app

RUN echo "Installing npm packages" && \
	npm install && \
	echo "Installation completed!"

CMD ["node", "gateway.js"]