# Google Cloud Platform Deployment Guide

This guide explains how to deploy the OneEightyHub web application to Google Cloud Platform.

## 📋 Prerequisites

1. **Google Cloud Account** with billing enabled
2. **gcloud CLI** installed ([Install Guide](https://cloud.google.com/sdk/docs/install))
3. **Project created** in Google Cloud Console

## 🔧 Initial Setup

### 1. Install and Configure gcloud CLI

```bash
# Install gcloud CLI (if not already installed)
# Visit: https://cloud.google.com/sdk/docs/install

# Initialize gcloud
gcloud init

# Set your project ID
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable run.googleapis.com
```

### 2. Verify Setup

```bash
# Check current project
gcloud config get-value project

# Test authentication
gcloud auth list
```

## 🚀 Deployment Options

### Option 1: Cloud Build + Container Registry (Manual)

```bash
# Build the image using Cloud Build
gcloud builds submit --config cloudbuild.yaml

# The image will be available at:
# gcr.io/YOUR_PROJECT_ID/oneeightyhub-web:latest
```

### Option 2: Cloud Build + Cloud Run (Automated)

1. **Edit `cloudbuild.yaml`** and uncomment the Cloud Run deployment step

2. **Update the region** if needed (default is `us-central1`)

3. **Deploy**:
```bash
gcloud builds submit --config cloudbuild.yaml
```

4. **Get the URL**:
```bash
gcloud run services describe oneeightyhub-web --region us-central1 --format 'value(status.url)'
```

### Option 3: Direct Cloud Run Deployment

```bash
# Build and deploy in one command
gcloud run deploy oneeightyhub-web \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 80
```

## 🔄 Continuous Deployment with GitHub

### Set up Cloud Build Trigger

1. **Connect your repository**:
   ```bash
   # Go to Cloud Console > Cloud Build > Triggers
   # Click "Connect Repository" and follow the steps
   ```

2. **Create a trigger**:
   - **Name**: `deploy-oneeightyhub`
   - **Event**: Push to branch
   - **Branch**: `^main$` (or your default branch)
   - **Configuration**: Cloud Build configuration file
   - **Location**: `/cloudbuild.yaml`

3. **Save** - Now every push to main will trigger a deployment!

## 🌐 Custom Domain Setup

### For Cloud Run:

```bash
# Map a custom domain
gcloud run domain-mappings create \
  --service oneeightyhub-web \
  --domain your-domain.com \
  --region us-central1

# Follow the instructions to update DNS records
```

## 💰 Cost Optimization

### Cloud Run Pricing Tips:

1. **Set minimum instances to 0** (default) for cost savings
2. **Set maximum instances** to control costs:
   ```bash
   gcloud run services update oneeightyhub-web \
     --max-instances 10 \
     --region us-central1
   ```

3. **Set memory and CPU limits**:
   ```bash
   gcloud run services update oneeightyhub-web \
     --memory 512Mi \
     --cpu 1 \
     --region us-central1
   ```

### Estimated Costs:
- **Cloud Build**: ~$0.003/build-minute (first 120 minutes/day free)
- **Container Registry**: ~$0.026/GB/month storage
- **Cloud Run**: Pay per request (2M requests/month free)

## 🔍 Monitoring and Logs

```bash
# View Cloud Build logs
gcloud builds list
gcloud builds log BUILD_ID

# View Cloud Run logs
gcloud run services logs read oneeightyhub-web --region us-central1

# Stream logs in real-time
gcloud run services logs tail oneeightyhub-web --region us-central1
```

## 🐛 Troubleshooting

### Build Fails: "Dockerfile not found"

**Solution**: Ensure you're running the command from the project root:
```bash
cd c:\Users\jrpak\Websites\OneEightyHubWebPage
gcloud builds submit --config cloudbuild.yaml
```

### Build Fails: "Permission Denied"

**Solution**: Grant Cloud Build permissions:
```bash
# Get the Cloud Build service account
PROJECT_NUMBER=$(gcloud projects describe YOUR_PROJECT_ID --format='value(projectNumber)')

# Grant necessary roles
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member=serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com \
  --role=roles/run.admin

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member=serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com \
  --role=roles/iam.serviceAccountUser
```

### Cloud Run: 502 Bad Gateway

**Solution**: Check that your app listens on port 80 and responds to health checks:
```bash
# Check logs
gcloud run services logs read oneeightyhub-web --region us-central1 --limit 50
```

### Build Timeout

**Solution**: Increase timeout in `cloudbuild.yaml`:
```yaml
timeout: '2400s'  # 40 minutes
```

## 📊 Useful Commands

```bash
# List all Cloud Run services
gcloud run services list

# Describe a service
gcloud run services describe oneeightyhub-web --region us-central1

# Update service configuration
gcloud run services update oneeightyhub-web \
  --region us-central1 \
  --set-env-vars "NODE_ENV=production"

# Delete a service
gcloud run services delete oneeightyhub-web --region us-central1

# List container images
gcloud container images list --repository gcr.io/YOUR_PROJECT_ID

# Delete old images
gcloud container images delete gcr.io/YOUR_PROJECT_ID/oneeightyhub-web:TAG
```

## 🔐 Security Best Practices

1. **Use Secret Manager** for sensitive data:
   ```bash
   # Create a secret
   echo -n "your-api-key" | gcloud secrets create api-key --data-file=-
   
   # Grant Cloud Run access
   gcloud secrets add-iam-policy-binding api-key \
     --member=serviceAccount:YOUR_SERVICE_ACCOUNT \
     --role=roles/secretmanager.secretAccessor
   ```

2. **Enable Cloud Armor** for DDoS protection

3. **Set up Cloud CDN** for better performance

4. **Use VPC** for private networking (if needed)

## 📚 Additional Resources

- [Cloud Build Documentation](https://cloud.google.com/build/docs)
- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Container Registry Documentation](https://cloud.google.com/container-registry/docs)
- [Pricing Calculator](https://cloud.google.com/products/calculator)

## 🎯 Quick Reference

```bash
# Build only
gcloud builds submit --config cloudbuild.yaml

# Build and deploy to Cloud Run
gcloud run deploy oneeightyhub-web --source . --region us-central1 --allow-unauthenticated

# View logs
gcloud run services logs tail oneeightyhub-web --region us-central1

# Get service URL
gcloud run services describe oneeightyhub-web --region us-central1 --format 'value(status.url)'
```
