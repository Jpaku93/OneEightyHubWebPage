# Cloud Deployment Guide - 180 Hub

## Google Cloud Run / Cloud Platform Deployment

Your application is now configured to work with cloud platforms that require dynamic port configuration (like Google Cloud Run, which uses PORT=8080).

### How It Works

1. **Dockerfile**: Multi-stage build that:
   - Builds the React app with Vite
   - Serves it with Nginx
   - Supports dynamic PORT environment variable

2. **docker-entrypoint.sh**: Startup script that:
   - Reads the PORT environment variable (defaults to 8080)
   - Configures Nginx to listen on that port
   - Starts Nginx

3. **nginx.conf**: Template configuration with `${PORT}` placeholder

### Deployment Steps

#### Option 1: Google Cloud Run (Recommended)

```bash
# 1. Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/180hub

# 2. Deploy to Cloud Run
gcloud run deploy 180hub \
  --image gcr.io/YOUR_PROJECT_ID/180hub \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### Option 2: Deploy from GitHub Repository

1. Go to Google Cloud Console → Cloud Run
2. Click "Create Service"
3. Select "Continuously deploy from a repository"
4. Connect your GitHub repository
5. Configure:
   - **Branch**: main (or your default branch)
   - **Build Type**: Dockerfile
   - **Dockerfile location**: /Dockerfile
6. Click "Deploy"

#### Option 3: Local Docker Test

```bash
# Build the image
docker build -t 180hub .

# Run with default port (8080)
docker run -p 8080:8080 180hub

# Run with custom port
docker run -p 3000:3000 -e PORT=3000 180hub

# Access at http://localhost:8080 or http://localhost:3000
```

### Environment Variables

If you need to set the Gemini API key:

```bash
# Cloud Run
gcloud run deploy 180hub \
  --image gcr.io/YOUR_PROJECT_ID/180hub \
  --set-env-vars GEMINI_API_KEY=your_api_key_here

# Docker
docker run -p 8080:8080 \
  -e GEMINI_API_KEY=your_api_key_here \
  180hub
```

### Troubleshooting

#### Container fails to start
- **Check logs**: The container logs will show which port it's trying to use
- **Verify PORT**: Ensure the PORT environment variable is set correctly
- **Health check**: The `/health` endpoint should respond on the configured port

#### Port mismatch
- Cloud Run sets PORT=8080 automatically
- The container reads this and configures Nginx accordingly
- Make sure your port mapping matches: `-p 8080:8080`

### Files Created

- `Dockerfile` - Multi-stage build with dynamic port support
- `docker-entrypoint.sh` - Startup script for port configuration
- `nginx.conf` - Nginx configuration template with PORT variable
- `.dockerignore` - Optimizes Docker build

### Health Check

The container includes a health check endpoint:
- **URL**: `http://your-app-url/health`
- **Response**: `healthy`
- **Used by**: Docker, Cloud Run, and other orchestration platforms

### Next Steps

1. Test locally: `docker build -t 180hub . && docker run -p 8080:8080 180hub`
2. Push to your container registry
3. Deploy to your cloud platform
4. Verify the deployment at your cloud URL

---

**Note**: The application is a static React SPA, so all routes are handled client-side. The Nginx configuration includes SPA fallback routing to ensure all routes work correctly.
