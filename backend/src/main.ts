import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import UserRouter from './Routes/UserRouter';

// Load environment variables
dotenv.config();

// Debug environment variables
console.log('Environment Variables:');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not Set');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not Set');
console.log('GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID ? 'Set' : 'Not Set');
console.log('GITHUB_CLIENT_SECRET:', process.env.GITHUB_CLIENT_SECRET ? 'Set' : 'Not Set');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.JWT_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Serialize user for the session
passport.serializeUser((user: any, done) => {
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user: any, done) => {
  done(null, user);
});

// Routes
app.use('/auth', UserRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});