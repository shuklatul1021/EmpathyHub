# EmpathyHub – An AI-Powered Peer Support Platform for Mental Health

EmpathyHub is a web and mobile application that uses AI to connect individuals experiencing mental health challenges (such as anxiety, stress, or loneliness) with empathetic peer supporters in real-time, fostering meaningful human connections. Unlike traditional mental health apps, EmpathyHub leverages Bolt.new's AI to match users based on shared experiences, emotional needs, and communication preferences, while incorporating gamified engagement to encourage consistent use and community building. The platform prioritizes accessibility, inclusivity, and privacy, making mental health support approachable and stigma-free.

---

## Why EmpathyHub is Unique

- **Peer-to-Peer Focus:** Matches users with peers who have similar lived experiences (e.g., workplace burnout, grief), creating authentic, relatable support networks.
- **AI-Driven Matching:** Uses Bolt.new's AI to analyze user input (questionnaire or text prompts) and match based on emotional state, life circumstances, and preferred communication style (text, voice, or video).
- **Gamified Engagement:** Features empathy points, badges for active listening, and progress trackers to motivate regular engagement and community building.
- **Viral Potential:** Focuses on relatable, shareable stories and a "pay-it-forward" model to drive organic growth through social media and advocacy.
- **Inclusivity:** Supports multiple languages and cultural contexts, using AI to adapt content and match users across diverse backgrounds.
- **Privacy & Safety:** Prioritizes anonymity and secure data handling to make support approachable and stigma-free.

---

## Tech Stack
- **Frontend:** React (web), React Native or Flutter (mobile)
- **Backend:** Node.js/Express, Prisma, JWT authentication
- **WebSocket Server:** Node.js + ws (for real-time chat)
- **AI Integration:** Bolt.new API
- **Database:** PostgreSQL (or your preferred DB)

---

## Project Structure
```
.
├── backend/         # Express/Prisma backend API
├── Websocket/       # Node.js WebSocket server
├── Frontend/        # React frontend
└── README.md
```

---

## Setup Instructions

### 1. Backend API
1. Go to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file (see `.env.example` for reference).
4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:3000` by default.

### 2. WebSocket Server
1. Go to the Websocket directory:
   ```bash
   cd Websocket
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build and start the WebSocket server:
   ```bash
   npm run dev
   ```
   The WebSocket server will run on `ws://localhost:8080` by default.

### 3. Frontend (React)
1. Go to the Frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `src/config.ts` file:
   ```ts
   // src/config.ts
   export const BACKEND_URL = 'http://localhost:3000';
   ```
4. Start the React app:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:5173` (or similar, depending on your setup).

---

## Usage
- Register or log in via the frontend.
- Complete the onboarding questionnaire to help AI match you with the right peer supporters.
- Only users with accepted connection requests (friends) will appear in the chat sidebar.
- Click a friend to open the chat and send real-time messages.
- Earn empathy points and badges for active participation.

---

## Customization & Extending
- Update backend endpoints as needed for your user/connection logic.
- The WebSocket server expects a valid JWT token for authentication (sent as a query param).
- The frontend expects user info and token to be stored in `localStorage` after login.
- Integrate Bolt.new's AI for advanced matching and language support.

---

## Troubleshooting
- Ensure all three services (backend, websocket, frontend) are running.
- Check your `.env` and `config.ts` for correct URLs and credentials.
- If you change ports, update them in all relevant places.

---

## License
MIT 