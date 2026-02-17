FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml ./
COPY src ./src
RUN mvn package -DskipTests

# Second stage: run the app
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=build /app/target/finance-service-0.0.1-SNAPSHOT.jar ./finance-service.jar
EXPOSE 8080
CMD ["java", "-jar", "finance-service.jar"]
