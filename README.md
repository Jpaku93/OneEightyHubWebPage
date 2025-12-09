# 180 Hub Web Application

## Architecture Overview

This application follows modern React architectural standards with proper routing and component organization.

### Project Structure

```
OneEightyHubWebPage/
├── components/          # Reusable UI components
│   ├── About.tsx
│   ├── AdminDashboard.tsx
│   ├── Community.tsx
│   ├── Events.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Hub.tsx
│   ├── HubPage.tsx
│   ├── MinistryDetail.tsx
│   └── Navigation.tsx
├── pages/              # Page-level components
│   └── HomePage.tsx
├── contexts/           # React contexts
│   └── ImageContext.tsx
├── utils/              # Utility functions
│   └── calendar.ts
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main app with routing
└── index.tsx           # Application entry point
```

### Routing Architecture

The application uses **React Router v6** for client-side routing with the following routes:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Main landing page with Hero, Events, Hub preview, Community, and Footer |
| `/hub` | HubPage | Full Hub page with ministries and calendar |
| `/about` | About | About page |
| `/admin` | AdminDashboard | Admin dashboard (protected) |

### Key Features

#### 1. **Clean URL Structure**
- Each page has its own dedicated route
- Browser back/forward buttons work correctly
- Direct URL access to any page
- Shareable URLs for specific pages

#### 2. **Component Organization**
- **Components**: Reusable UI components
- **Pages**: Page-level components that compose multiple components
- **Contexts**: Global state management (ImageContext)
- **Utils**: Helper functions and utilities

#### 3. **Navigation**
- Persistent navigation bar across all pages (except admin)
- Active tab highlighting based on current route
- Auto-hide on scroll down, show on scroll up
- Smooth transitions between pages

#### 4. **Scroll Management**
- Independent scroll containers per route
- Smooth scroll to top on navigation
- Scroll-based animations (tech-reveal)
- Parallax effects on home page

### Development

#### Running the Application
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

#### Available Routes
- Home: `http://localhost:3000/`
- Hub: `http://localhost:3000/hub`
- About: `http://localhost:3000/about`
- Admin: `http://localhost:3000/admin`

### Technical Stack

- **React 19** - UI framework
- **React Router v6** - Client-side routing
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library

### Best Practices Implemented

1. ✅ **Proper Routing**: React Router for URL-based navigation
2. ✅ **Component Composition**: Pages compose smaller components
3. ✅ **Type Safety**: TypeScript for all components
4. ✅ **Separation of Concerns**: Clear separation between pages, components, and utilities
5. ✅ **Context API**: Global state management for images
6. ✅ **Responsive Design**: Mobile-first approach with Tailwind
7. ✅ **Performance**: Lazy loading and optimized animations
8. ✅ **Accessibility**: Semantic HTML and ARIA labels

### Future Enhancements

- [ ] Add route-based code splitting
- [ ] Implement protected routes with authentication
- [ ] Add page transitions
- [ ] SEO optimization with React Helmet
- [ ] Analytics integration
- [ ] Error boundaries for better error handling
