FROM openjdk:8-jdk-slim

MAINTAINER "Swet Shah"

RUN mkdir /app

COPY . /app

WORKDIR /app

EXPOSE 8080

CMD ["java", "-jar", "-Dspring.data.mongodb.host=mongo_db", "target/UserManagement-0.0.1-SNAPSHOT.jar"]
