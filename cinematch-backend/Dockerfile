# Stage 1: Build the project with Maven and Java 21
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Create a light image to run the app
FROM eclipse-temurin:21-jdk
WORKDIR /app
# Copy the .jar file generated in stage 1
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "app.jar"]