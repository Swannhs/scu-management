import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.util.Optional;

public class ServiceServer {
    public static void main(String[] args) throws IOException {
        String serviceName = Optional.ofNullable(System.getenv("SERVICE_NAME")).orElse("java-service");
        int port = Integer.parseInt(Optional.ofNullable(System.getenv("PORT")).orElse("8080"));
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        server.createContext("/", exchange -> {
            String response = String.format("{\"service\":\"%s\",\"path\":\"%s\",\"message\":\"Stub service running. Replace with Spring Boot implementation.\"}",
                    serviceName, exchange.getRequestURI());
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, response.getBytes().length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes());
            }
        });
        server.start();
        System.out.println(serviceName + " listening on port " + port);
    }
}
