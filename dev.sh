#!/bin/bash

# University Management System - Development Mode Startup Script
# This script starts the entire microservices project with Docker Compose

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if Docker is running
print_header "Checking Prerequisites"
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed. Please install Docker first."
    exit 1
fi
print_success "Docker is installed"

if ! docker compose version &> /dev/null; then
    echo "Error: Docker Compose is not installed or not available as a plugin. Please install Docker Compose first."
    exit 1
fi
print_success "Docker Compose is installed"

# Navigate to project root
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_ROOT"
print_success "Project root: $PROJECT_ROOT"

# Start services
print_header "Starting Microservices in Development Mode"
echo "Building and starting all services with Docker Compose..."
echo ""

docker compose -f infra/docker-compose.yml up --build

# If the user exits the process, show cleanup info
trap 'print_header "Cleaning Up"; echo "To stop all services, press Ctrl+C again or run: docker compose -f infra/docker-compose.yml down"' EXIT
