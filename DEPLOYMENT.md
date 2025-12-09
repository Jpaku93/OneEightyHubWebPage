# 180 Hub - Deployment Guide

## 📦 Production Build

This project is optimized for static web deployment. The production build is located in the `dist/` directory.

### Build Information
- **Framework**: React 19 + Vite 6
- **Build Tool**: Vite with Terser minification
- **Output**: Static HTML, CSS, and JavaScript files
- **Code Splitting**: Enabled for optimal loading performance
  - React vendor bundle (~11 KB)
  - Router bundle (~32 KB)
  - Icons bundle (~9 KB)
  - Main app bundle (~272 KB)

## 🚀 Deployment Options

### Option 1: Static Hosting Services (Recommended)

#### Netlify
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build the project: `npm run build`
3. Deploy: `netlify deploy --prod --dir=dist`

Or use drag-and-drop deployment:
1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag the `dist` folder to the upload area

#### Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Build the project: `npm run build`
3. Deploy: `vercel --prod`

Or use the Vercel dashboard:
1. Import your Git repository
2. Vercel will auto-detect Vite and configure build settings
3. Deploy automatically on push

#### GitHub Pages
1. Build the project: `npm run build`
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add to package.json scripts:
   ```json
   "deploy": "gh-pages -d dist"
   ```
4. Deploy: `npm run deploy`

#### Cloudflare Pages
1. Connect your Git repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

### Option 2: Docker + Nginx

A `nginx.conf` file is included for containerized deployments.

1. Build the Docker image:
   ```bash
   docker build -t 180hub .
   ```

2. Run the container:
   ```bash
   docker run -p 80:80 180hub
   ```

The Nginx configuration includes:
- Gzip compression for optimal transfer sizes
- Security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- Static asset caching (1 year for immutable assets)
- SPA fallback routing (all routes serve index.html)
- Health check endpoint at `/health`

### Option 3: Traditional Web Server

Simply copy the contents of the `dist/` folder to your web server's public directory.

**Important**: Configure your server to:
1. Serve `index.html` for all routes (SPA fallback)
2. Enable gzip compression
3. Set appropriate cache headers for static assets

Example Apache `.htaccess`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 🔧 Build Commands

- **Development**: `npm run dev` - Start development server on port 3000
- **Production Build**: `npm run build` - Create optimized production build
- **Preview Build**: `npm run preview` - Preview production build locally

## 📁 Project Structure

```
dist/                      # Production build output
├── assets/               # Optimized JS and CSS bundles
│   ├── icons-*.js       # Lucide React icons bundle
│   ├── react-vendor-*.js # React core libraries
│   ├── router-*.js      # React Router bundle
│   └── index-*.js       # Main application code
├── images/              # Static images
└── index.html           # Entry point
```

## ⚙️ Build Optimizations

The production build includes:
- ✅ Terser minification with console.log removal
- ✅ Code splitting by vendor and feature
- ✅ Tree shaking for unused code elimination
- ✅ Asset hashing for cache busting
- ✅ No source maps (for smaller bundle size)
- ✅ Optimized chunk sizes

## 🌐 Environment Variables

If you need to configure the Gemini API key for production:

1. Create a `.env` file in the root directory (DO NOT commit this)
2. Add: `GEMINI_API_KEY=your_api_key_here`
3. Rebuild: `npm run build`

For static hosting services, set environment variables in their dashboard:
- **Netlify**: Site settings → Build & deploy → Environment
- **Vercel**: Project settings → Environment Variables
- **Cloudflare Pages**: Settings → Environment variables

## 📊 Performance

The optimized build achieves:
- Total bundle size: ~324 KB (before gzip)
- Gzipped size: ~78-90 KB
- Initial load: React vendor + Router + Main app
- Lazy loaded: Icons and other features as needed

## 🔒 Security

The included `nginx.conf` provides:
- X-Frame-Options: SAMEORIGIN (prevents clickjacking)
- X-Content-Type-Options: nosniff (prevents MIME sniffing)
- X-XSS-Protection: enabled (XSS attack protection)

## 📝 Notes

- The `dist/` folder contains everything needed for deployment
- All source files (`.tsx`, `.ts`) are compiled and not needed in production
- `node_modules/` is only required for development
- The build is fully static and requires no server-side processing
