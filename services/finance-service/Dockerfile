FROM eclipse-temurin:17-jdk AS build
WORKDIR /app
COPY ServiceServer.java .
RUN javac ServiceServer.java

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/ServiceServer.class .
ENV PORT=8080
ENV SERVICE_NAME=java-service
EXPOSE 8080
CMD ["java", "ServiceServer"]
