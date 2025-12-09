# Quick Fix for Cloud Run Deployment

## What Changed

The Dockerfile has been updated to:
1. **Create the startup script inline** - Avoids Windows/Linux line ending issues
2. **Remove dependency on external script file** - More reliable
3. **Add debug output** - Shows the generated nginx config for troubleshooting

## Deploy to Cloud Run

### Option 1: From GitHub Repository (Recommended)

1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Fix Cloud Run deployment with inline startup script"
   git push
   ```

2. **Deploy from Cloud Console:**
   - Go to [Google Cloud Run](https://console.cloud.google.com/run)
   - Click "Create Service"
   - Select "Continuously deploy from a repository"
   - Connect your GitHub repo
   - Cloud Run will automatically build and deploy

### Option 2: Using gcloud CLI

```bash
# Build and deploy in one command
gcloud run deploy 180hub \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## What the Dockerfile Does

1. **Build Stage**: Compiles your React app with Vite
2. **Nginx Stage**: 
   - Installs nginx and required tools
   - Creates a startup script that:
     - Reads PORT environment variable (Cloud Run sets this to 8080)
     - Generates nginx config with the correct port
     - Shows the config for debugging
     - Tests the nginx configuration
     - Starts nginx

## Debugging

If the deployment still fails, check the Cloud Run logs:

1. Go to Cloud Run service
2. Click "Logs" tab
3. Look for:
   - "Starting nginx on port 8080..." - Confirms startup
   - The nginx configuration output - Shows what port is configured
   - Any nginx errors

## Expected Behavior

When the container starts, you should see:
```
Starting nginx on port 8080...
server {
    listen 8080;
    ...
}
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

## Common Issues Fixed

✅ **Line ending issues** - Script is created inside Docker, not copied from Windows
✅ **Port configuration** - Dynamically set from PORT environment variable  
✅ **Health check** - `/health` endpoint responds on correct port
✅ **SPA routing** - All routes fall back to index.html

## Files You Can Delete (Optional)

Since we're creating the script inline, you can delete:
- `docker-entrypoint.sh` (no longer used)

## Next Steps

1. Push your code to GitHub
2. Deploy from Cloud Run console
3. Wait for build to complete (~2-3 minutes)
4. Access your app at the Cloud Run URL
5. Test the health endpoint: `https://your-app-url/health`

---

**The deployment should now work!** The inline script approach is more reliable for Cloud Run deployments.
