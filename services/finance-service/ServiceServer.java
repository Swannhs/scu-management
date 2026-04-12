import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

public class ServiceServer {
    public static void main(String[] args) throws IOException {
        String serviceName = Optional.ofNullable(System.getenv("SERVICE_NAME")).orElse("java-service");
        int port = Integer.parseInt(Optional.ofNullable(System.getenv("PORT")).orElse("8080"));
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        server.createContext("/", exchange -> {
            String path = exchange.getRequestURI().getPath();
            String method = exchange.getRequestMethod();
            String tenantId = exchange.getRequestHeaders().getFirst("X-Tenant-ID");
            String response;
            int status = 200;

            if ("/finance/invoices".equals(path) && "GET".equalsIgnoreCase(method)) {
                if (tenantId == null || tenantId.isBlank()) {
                    status = 400;
                    response = "{\"error\":{\"code\":\"TENANT_REQUIRED\",\"message\":\"X-Tenant-ID header is required\",\"details\":null}}";
                } else {
                    response = String.format(
                            "{\"data\":[],\"meta\":{\"tenantId\":\"%s\",\"count\":0}}",
                            tenantId
                    );
                }
            } else {
                response = String.format("{\"service\":\"%s\",\"path\":\"%s\",\"message\":\"Stub service running. Replace with Spring Boot implementation.\"}",
                        serviceName, exchange.getRequestURI());
            }

            exchange.getResponseHeaders().set("Content-Type", "application/json");
            byte[] body = response.getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(status, body.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(body);
            }
        });
        server.start();
        System.out.println(serviceName + " listening on port " + port);
    }
}
