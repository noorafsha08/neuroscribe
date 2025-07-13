# 📝 NeuroScribe – Emotion-Based Note Taking & Productivity App

NeuroScribe is a **full-stack web and mobile application** integrating **AI-powered sentiment analysis** with note-taking and task planning. It enhances productivity and mental well-being by understanding user emotions in real-time and providing personalised suggestions.

---

## 🚀 Features

- 🧠 **AI Sentiment Analysis** – Detect emotional tone in notes and tasks using NLP models.
- 📝 **Emotion-Tagged Notes & Tasks** – Categorise entries based on detected moods.
- 📊 **Emotion Trends Visualisation** – View weekly and monthly emotional trends via interactive charts.
- 🎶 **Smart Suggestions** – Motivational quotes, breathing exercises, or Spotify playlists based on mood.
- 🔍 **Emotion-Based Search Filters** – Retrieve notes by specific emotional tags.
- 🔐 **Secure Authentication** – JWT or Firebase authentication for user accounts.
- 🌐 **Responsive Design** – Works seamlessly on mobile and desktop.
- 🎨 **Modern UI** – Clean, minimal interface with Tailwind CSS and Framer Motion animations.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (18), Tailwind CSS, React Router v6
- **Mobile (Planned):** React Native or Kotlin (Android)
- **State Management:** Redux Toolkit
- **Backend:** Node.js + Express.js OR Python Flask for AI microservice
- **NLP:** HuggingFace Transformers (BERT / DistilBERT)
- **Database:** MongoDB / Firebase Firestore
- **Authentication:** Firebase Auth / JWT
- **Data Visualisation:** D3.js, Recharts
- **Animations:** Framer Motion
- **Deployment:** Vercel / Netlify (frontend), Render / Railway / Heroku (backend)

---

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- Python 3.x (if using Flask for NLP service)

---

## 🖥️ Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/neuroscribe.git
   cd neuroscribe
   
2. **Install frontend dependencies:**
   
   ```bash
   npm install
   # or
   yarn install
3. **Start frontend development server:**
   
    ```bash
   npm start
   # or
   yarn start

4. **Set up backend API::**

- Navigate to the backend/ folder

- Install backend dependencies

- Start the backend server

5. **Set environment variables in a .env file for API URLs, database URI, and API keys.**
   Create a .env file in both frontend/ and backend/ directories as needed, and add:

  ```ini 
   REACT_APP_API_URL=http://localhost:5000/api
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
HUGGINGFACE_API_KEY=your_huggingface_api_key


📁 Project Structure
bash
Copy
Edit
neuroscribe/
├── backend/             # Node.js/Flask API server
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── styles/      # Tailwind and global styles
│   │   ├── App.jsx      # Main app component
│   │   ├── Routes.jsx   # Application routes
│   │   └── index.jsx    # Entry point
├── .env                 # Environment variables
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
🧠 AI/NLP Integration
Uses HuggingFace Transformers for sentiment analysis:

Model: DistilBERT (sentiment classification)

Access via Python Flask microservice or HuggingFace Inference API

🎨 Styling
Built with Tailwind CSS, includes:

Forms plugin

Typography plugin

Aspect ratio plugin

Container queries

Fluid typography

Framer Motion for smooth animations

🔄 Adding Routes Example
Update Routes.jsx to add new pages:

jsx
Copy
Edit
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import NotesPage from "pages/NotesPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/notes", element: <NotesPage /> },
    // Add more routes as needed
  ]);

  return element;
};

export default ProjectRoutes;
📊 Data Visualisation
This app uses D3.js and Recharts to plot user emotion trends weekly and monthly for better mental health awareness.

📦 Deployment
Build for production:

bash
Copy
Edit
npm run build
Deploy frontend to Vercel/Netlify and backend to Render/Railway/Heroku.

📱 Mobile App Version
A React Native version is planned to extend NeuroScribe to Android and iOS with the same backend API for seamless cross-platform usage.

💡 Future Enhancements
Voice note input with speech-to-text

Personalised AI suggestions based on user trends

Dark mode support

Full offline capability

🙏 Acknowledgements
React – Frontend library

HuggingFace Transformers – NLP models

Tailwind CSS – Styling

Framer Motion – Animations

Spotify API – Music suggestions

Firebase – Authentication and Firestore

❤️ Built With
Built with passion to merge mental health awareness with productivity using modern web and AI technologies.

✨ Connect with Me
LinkedIn | GitHub




