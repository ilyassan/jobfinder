# JobFinder - Job Search Application

A modern, feature-rich job search application built with Angular 19 and NgRx. JobFinder allows users to search for job opportunities from multiple sources, manage their favorite listings, and track their applications in one centralized platform.

![Angular](https://img.shields.io/badge/Angular-19-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue?logo=typescript)
![NgRx](https://img.shields.io/badge/NgRx-State%20Management-purple)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 🔍 Job Search
- **Advanced Search**: Search jobs by keywords and location
- **Real-time Results**: Instant job listings from multiple API sources
- **Sorting & Filtering**: Results sorted by publication date (newest first)
- **Pagination**: Browse results with 10 jobs per page
- **Loading States**: Visual feedback with spinner during search

### ❤️ Favorites Management
- **Save Jobs**: Bookmark job listings for later
- **Manage Favorites**: View all saved jobs in a dedicated page
- **Smart Caching**: Prevents duplicate entries
- **Visual Indicators**: See which jobs are already saved

### 📋 Application Tracking
- **Track Applications**: Monitor all job applications in one place
- **Status Management**: Update application status (Pending, Accepted, Rejected)
- **Personal Notes**: Add and edit notes for each application
- **Application History**: Keep track of when you applied

### 👤 User Authentication
- **User Registration**: Create an account with email and password
- **Secure Login**: Email/password authentication with session management
- **Profile Management**: Edit your information or delete your account
- **Protected Routes**: Secure access to user-specific features

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Clean UI**: Modern interface with green color theme
- **Dark/Light Awareness**: Adapts to system preferences
- **Fast Performance**: Lazy-loaded routes and optimized bundle

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Angular 19 (Standalone Components)
- **State Management**: NgRx (Favorites, Application State)
- **HTTP Client**: RxJS Observables
- **Forms**: Reactive Forms with Validators
- **Styling**: Custom CSS (responsive design)

### Backend & Data
- **Mock API**: JSON Server (local persistence)
- **Job Data**: arbeitnow.com API
- **Storage**: localStorage (user authentication)
- **Database**: db.json (users, favorites, applications)

### Build & Development
- **CLI**: Angular CLI 19
- **Package Manager**: npm
- **Type Safety**: TypeScript 5+
- **Development Server**: Webpack dev server

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Angular CLI** (optional but recommended)
  ```bash
  npm install -g @angular/cli
  ```

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd jobfinder
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install JSON Server (for mock API)
```bash
npm install -g json-server
# or
npm install json-server --save-dev
```

---

## ⚙️ Configuration

### JSON Server Setup
The app uses JSON Server to simulate a backend API. The database file is at `db.json`.

**Modify database URL if needed:**
- File: `src/environments/environment.ts`
- Default: `http://localhost:5000`

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://www.arbeitnow.com/api',
  jsonServerUrl: 'http://localhost:5000'
};
```

---

## 🏃 Running the Application

### Option 1: Run with JSON Server (Recommended)

**Terminal 1 - Start JSON Server:**
```bash
npm run start:server
# or manually:
json-server --watch db.json --port 5000
```

**Terminal 2 - Start Angular App:**
```bash
npm start
# or
ng serve
```

The application will be available at: **http://localhost:4200**

### Option 2: Development Server Only
```bash
ng serve
```

---

## 📁 Project Structure

```
jobfinder/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/          # Route guards (auth, guest)
│   │   │   ├── models/          # TypeScript interfaces
│   │   │   ├── services/        # Core services (auth, jobs, favorites, applications)
│   │   │   └── interceptors/    # HTTP interceptors (optional)
│   │   │
│   │   ├── features/
│   │   │   ├── auth/            # Login, Register, Profile
│   │   │   ├── jobs/            # Job Search, Search Bar
│   │   │   ├── favorites/       # Favorites Page
│   │   │   └── applications/    # Applications Tracking
│   │   │
│   │   ├── shared/
│   │   │   └── components/      # Navbar (shared across app)
│   │   │
│   │   ├── store/
│   │   │   └── favorites/       # NgRx state management
│   │   │       ├── actions
│   │   │       ├── reducer
│   │   │       ├── selectors
│   │   │       ├── effects
│   │   │       └── state
│   │   │
│   │   ├── app.routes.ts        # Route configuration
│   │   ├── app.config.ts        # App providers (NgRx, HTTP, etc)
│   │   └── app.component.ts     # Root component
│   │
│   ├── styles.css               # Global styles
│   ├── environments/            # Environment configs
│   └── index.html
│
├── db.json                       # Mock database (users, favorites, applications)
├── package.json
└── README.md
```

---

## 📚 Using the Application

### 1. **Search for Jobs**
- Navigate to the home page
- Enter a job title in the search bar
- Select a location (optional)
- Click "Search" to view results
- No login required for searching!

### 2. **Create an Account**
- Click "Sign Up" in the navbar
- Fill in your name, email, and password
- Click "Create Account"
- You'll be logged in automatically

### 3. **Save Your Favorites**
- Search for jobs (logged in required)
- Click the **"Save"** button on any job card
- View all favorites at `/favorites`
- Click **"Remove"** to unsave a job

### 4. **Track Your Applications**
- Click **"Track"** button on any job
- Go to `/applications` to see all tracked jobs
- Update the application status (Pending, Accepted, Rejected)
- Add personal notes about each application

### 5. **Manage Your Profile**
- Click on your name in the navbar
- Edit your information
- Delete your account (if desired)

---

## 🏗️ Architecture Overview

### State Management (NgRx)
The app uses **NgRx** for managing the favorites state:
- **Actions**: User interactions (add, remove favorites)
- **Reducer**: State updates based on actions
- **Effects**: Side effects (API calls to JSON Server)
- **Selectors**: Query favorite state efficiently

```
User clicks "Save"
    ↓
FavoritesActions.addFavorite()
    ↓
FavoritesReducer updates state
    ↓
FavoritesEffects calls API
    ↓
State updated in store
    ↓
Component subscribes to new state
```

### Route Protection
- **authGuard**: Protects routes that require login
- **guestGuard**: Prevents logged-in users from accessing login/register
- Protected routes: `/favorites`, `/applications`, `/profile`
- Public routes: `/`, `/jobs`, `/login`, `/register`

### Lazy Loading
- **Favorites route** is lazy-loaded for better performance
- Initial bundle size reduced by splitting code chunks

---

## 🌐 API Integration

### Job API
- **Source**: [arbeitnow.com API](https://www.arbeitnow.com/api/v2/jobs)
- **Endpoint**: `/job-board-api`
- **Method**: GET
- **Parameters**: `search`, `location`, `page`
- **Response**: Array of job objects with title, company, location, etc.

### JSON Server API
Endpoints for user data, favorites, and applications:

```
Users:
  GET    /users
  POST   /users
  PATCH  /users/:id
  DELETE /users/:id

Favorites:
  GET    /favoritesOffers
  POST   /favoritesOffers
  DELETE /favoritesOffers/:id

Applications:
  GET    /applications
  POST   /applications
  PATCH  /applications/:id
  DELETE /applications/:id
```

---

## 🔐 Authentication Flow

1. **Registration**:
   - User submits email, password, name
   - App checks if email already exists
   - Creates new user in JSON Server
   - Stores user (without password) in localStorage

2. **Login**:
   - User enters email and password
   - App queries JSON Server for matching user
   - Validates password
   - Stores user in localStorage
   - Redirects to home page

3. **Session Management**:
   - localStorage persists across browser sessions
   - authGuard checks localStorage on protected routes
   - logout() clears localStorage and redirects to login

---

## 🎯 Key Features Details

### Search Filtering
- **Keyword Search**: Filters by job title (not description)
- **Location Search**: Filters by city/country
- **Sorting**: Results ordered by creation date (newest first)
- **Pagination**: 10 results per page with navigation

### Favorites System
- **Prevents Duplicates**: Can't save the same job twice
- **User-Specific**: Each user has their own favorites
- **Persistent Storage**: Saved in JSON Server

### Application Tracking
- **Status Tracking**: Pending → Accepted/Rejected
- **Notes Support**: Add personal notes to each application
- **Date Recording**: Tracks when application was added

---

## 🧪 Building for Production

### Create Production Build
```bash
ng build --configuration production
```

### Output
- Optimized bundle in `dist/jobfinder/`
- Minified CSS and JavaScript
- Tree-shaking removes unused code
- Ready to deploy to any static hosting

---

## 📖 Development Commands

```bash
# Start dev server
npm start

# Start JSON Server
npm run start:server

# Build for production
ng build

# Run unit tests
ng test

# Run e2e tests
ng e2e

# Lint code
ng lint

# Check what changed
git status
```

---

## 🎨 Customization

### Colors
The app uses a green color theme. To customize:
1. Edit CSS files in `src/app/features/` and `src/styles.css`
2. Replace color hex codes with your brand colors
3. Rebuild the app

### API Source
To use a different job API:
1. Update `src/environments/environment.ts`
2. Modify `JobService` in `src/app/core/services/job.service.ts`
3. Update the API response mapping

---

## 🚀 Performance Optimizations

- ✅ **Lazy Loading**: Favorites route loaded on demand
- ✅ **OnPush Change Detection**: Components update efficiently
- ✅ **RxJS Operators**: Proper use of map, filter, switchMap
- ✅ **CSS Custom Properties**: Reduces file size vs utility classes
- ✅ **Standalone Components**: Smaller bundle, better tree-shaking

---

## 🔍 Testing

The application includes:
- ✅ Type safety with TypeScript
- ✅ Form validation with Angular Validators
- ✅ Error handling in all services
- ✅ Guard protection on sensitive routes
- ✅ Manual testing scenarios (search, auth, tracking)

---

## 📝 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

---


## 📞 Support

If you encounter any issues:

1. Check that Node.js and npm are installed correctly
2. Ensure JSON Server is running on port 5000
3. Clear browser cache and localStorage
4. Check browser console for error messages
5. Verify all dependencies are installed: `npm install`

---

## 🙏 Acknowledgments

- **Angular Team**: For the excellent framework
- **NgRx**: For robust state management
- **arbeitnow.com**: For the job data API
- **JSON Server**: For mock backend capabilities

---

## 📚 Resources

- [Angular Documentation](https://angular.dev)
- [NgRx Documentation](https://ngrx.io)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [JSON Server GitHub](https://github.com/typicode/json-server)

---

**Last Updated**: February 2026
**Version**: 1.0.0
