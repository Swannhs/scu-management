FROM php:8.2-cli
WORKDIR /app
COPY index.php .
ENV PORT=8000
ENV SERVICE_NAME=php-service
EXPOSE 8000
CMD ["sh", "-c", "php -S 0.0.0.0:${PORT} index.php"]
