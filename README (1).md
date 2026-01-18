# Session Planner

An interactive session planning tool similar to SessionLab for planning meetings and classes.

## Features

### Planning Features
- **Drag-and-drop** activity library
- **Learning objectives** tracking
- **Session notes** and activity-specific notes
- **Resource links** at session and activity level
- **Automatic time calculation**
- **Customizable activities** with different types (content, engagement, practice, break)

### Session Management
- **Save sessions** to a local library for reuse
- **Load saved sessions** to continue planning or reuse templates
- **Session library** with all your saved sessions
- **Delete sessions** you no longer need

### Export Options
- **Export to PDF** - Professional formatted PDF with all session details
- **Export to TXT** - Simple text file export
- Both exports include all session details, objectives, resources, and agenda

### Data Persistence
- All sessions saved to browser localStorage
- Custom activities persist between sessions
- No server required - everything stored locally

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
- jsPDF (PDF export)

## Usage Tips

1. **Create a session** - Fill in the session details and add activities
2. **Save your session** - Click "Save Session" to add it to your library
3. **Reuse templates** - Load saved sessions as templates for future classes/meetings
4. **Export** - Download as PDF for professional sharing or TXT for simple backup

## Browser Compatibility

Works in all modern browsers. Data is stored in localStorage, so clearing browser data will delete saved sessions.
