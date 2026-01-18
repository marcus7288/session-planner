# Session Planner

An interactive session planning tool similar to SessionLab for planning meetings and classes.

## Features

- **Drag-and-drop** activity library
- **Learning objectives** tracking
- **Session notes** and activity-specific notes
- **Resource links** at session and activity level
- **Automatic time calculation**
- **Export** to text file
- **Customizable activities** with different types (content, engagement, practice, break)

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

This project is configured for easy deployment on Netlify.

### Deploy to Netlify

1. Push this repository to GitHub
2. Connect your GitHub repository to Netlify
3. Netlify will automatically detect the build settings
4. Deploy!

Build settings:
- Build command: `npm run build`
- Publish directory: `dist`

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide React (icons)
