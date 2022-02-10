FROM maven:3.8.4-jdk-11

MAINTAINER "Swet Shah"

RUN mkdir /app

COPY . /app

WORKDIR /app

RUN mvn package

EXPOSE 8080

CMD ["java", "-jar", "-Dspring.data.mongodb.host=mongo_db", "target/UserManagement-0.0.1-SNAPSHOT.jar"]
