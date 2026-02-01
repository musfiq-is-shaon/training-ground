# 🎓 AI Study Planner

<div align="center">

![AI Study Planner](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646cff?logo=vite)


**A modern, AI-powered study planner with smart scheduling, Pomodoro timer, and progress tracking.**

[Features](#-features) • [Quick Start](#-quick-start) • [Deployment](#-deployment)

</div>

---

##  Features

###  AI-Powered Study Planning
- **Smart Scheduling** — AI algorithm distributes study time based on subject priority and difficulty
- **Personalized Timetable** — Generates daily study plans tailored to your exam date
- **Progress Optimization** — Balances workload across all subjects automatically

###  Subject Management
- Add subjects with custom priority (1-5)
- Set difficulty levels for each subject
- Visual subject cards with gradient color coding
- Easy subject removal with one click

###  Exam Countdown
- Set your target exam date
- Visual countdown with days remaining
- Exam day reminders and notifications

### ⏱ Pomodoro Timer
- Configurable work sessions (10-60 minutes)
- Automatic break tracking
- Session statistics and history
- Sound notifications
- Daily progress tracking

###  Progress Tracking
- Visual circular progress indicator
- Task completion with checkboxes
- Streak tracking for motivation
- Smart study tips based on progress

###  Dark/Light Mode
- Toggle between themes with one click
- Auto-detect system preference
- Persistent theme storage
- Smooth animated transitions

###  Data Persistence
- All data saved to localStorage
- Automatic session statistics reset daily
- Settings preserved between sessions

---

##  Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-study-planner

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
The dev server runs at: `http://localhost:3000/`

---

##  Deployment to Vercel

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push
```

2. Import the repository in [Vercel](https://vercel.com)

3. Vercel will automatically detect the Vite + React configuration

4. Deploy!

**Manual Deployment:**
```bash
npm run build
# Deploy the dist/ folder to Vercel
```

---

##  Project Structure

```
ai-study-planner/
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Root component
    ├── index.css           # Global styles with Tailwind
    ├── components/
    │   ├── Header.jsx      # Navigation with dark mode toggle
    │   ├── SubjectInput.jsx # Add/remove subjects
    │   ├── ExamDateInput.jsx # Set exam date
    │   ├── TimetableCard.jsx # Daily study schedule
    │   ├── ProgressTracker.jsx # Progress visualization
    │   ├── PomodoroTimer.jsx # Focus timer
    │   ├── Stats.jsx       # Statistics overview
    │   ├── Settings.jsx    # Settings modal
    │   └── Dashboard.jsx   # Main dashboard
    └── utils/
        ├── storage.js      # localStorage utilities
        ├── dateUtils.js    # Date formatting functions
        └── aiPlanner.js    # AI plan generation logic
```

---

##  Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  primary: {
    500: '#0ea5e9',  // Main brand color
    // ...
  },
  accent: {
    purple: '#8b5cf6',
    pink: '#ec4899',
    // ...
  }
}
```

### Default Settings

Edit the default settings in `src/utils/storage.js`:

```javascript
const defaultData = {
  settings: {
    dailyStudyHours: 4,
    pomodoroDuration: 25,
    breakDuration: 5,
    // ...
  }
}
```

---

##  Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18.2.0 | UI framework |
| Vite 5.0.8 | Build tool |
| Tailwind CSS 3.3.6 | Styling |
| Lucide React | Icons |
| date-fns | Date utilities |
| localStorage | Data persistence |

---

##  License

Feel free to use this project for personal or commercial purposes.

---

<div align="center">

**Built with ❤️ for students everywhere**

⭐ Star this repo if you found it helpful!

</div>

