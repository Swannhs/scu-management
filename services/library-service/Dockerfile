FROM maven:3.9-jdk-17 AS build
WORKDIR /app
COPY pom.xml ./
COPY src ./src
RUN mvn package -DskipTests

# Second stage: run the app
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/library-service-0.0.1-SNAPSHOT.jar ./library-service.jar
EXPOSE 8080
CMD ["java", "-jar", "library-service.jar"]
