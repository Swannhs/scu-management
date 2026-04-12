#!/bin/bash

set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost}"
DASHBOARD_URL="${TRAEFIK_DASHBOARD_URL:-http://localhost:8088}"

check_url() {
  local name="$1"
  local url="$2"
  local expected="${3:-200}"

  local status
  status="$(curl -sS -o /tmp/$(echo "$name" | tr ' /' '__').out -w "%{http_code}" "$url" || true)"

  if [[ "$status" != "$expected" ]]; then
    echo "FAIL ${name}: expected ${expected}, got ${status} (${url})"
    if [[ -s "/tmp/$(echo "$name" | tr ' /' '__').out" ]]; then
      echo "Response:"
      cat "/tmp/$(echo "$name" | tr ' /' '__').out"
      echo
    fi
    return 1
  fi

  echo "OK   ${name}: ${url} -> ${status}"
}

check_url "Traefik health" "${BASE_URL}/health"
check_url "Traefik dashboard" "${DASHBOARD_URL}/dashboard/"
check_url "Protected users route without token" "${BASE_URL}/v1/users" "401"
check_url "Tenant-protected course route without tenant" "${BASE_URL}/v1/courses" "400"
check_url "User service docs" "${BASE_URL}/user-service/docs"
check_url "Campus social docs" "${BASE_URL}/campus-social-service/api-docs"
check_url "Document service OpenAPI" "${BASE_URL}/document-service/openapi.json"

echo "Traefik smoke test passed."
