FROM eclipse-temurin:21-jdk as build

WORKDIR /app

# Copy everything
COPY . .

# Make mvnw executable in case it's not
RUN chmod +x mvnw

# Build the app
RUN ./mvnw clean package -DskipTests

# ---- Final Image ----
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/research-blog-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
