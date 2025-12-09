#!/bin/sh
set -e

# Use PORT environment variable or default to 8080
export PORT=${PORT:-8080}

echo "Starting nginx on port $PORT..."

# Create nginx config from template with PORT substitution
envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Test nginx configuration
nginx -t

# Start nginx
exec nginx -g "daemon off;"
