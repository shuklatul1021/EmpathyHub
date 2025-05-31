import Router from "express"
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { Strategy as GitHubStrategy } from "passport-github2"
import { Profile as GoogleProfile } from "passport-google-oauth20"
import { Profile as GitHubProfile } from "passport-github2"

const UserRouter = Router();

const GOOGLE_CLIENT_ID="577784310858-sqip14v7hnsbgo0ns9jttumqieaip914.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET="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"
const GITHUB_CLIENT_ID="Ov23likaWc9eve6DqZpO"
const GITHUB_CLIENT_SECRET="de1e85870e7d6b32a586175c803843a6e74ab10d"
const BACKEND_URL = 'http://localhost:3000'
// Check if OAuth credentials are configured
const checkOAuthConfig = () => {
    const missingVars = [];
    if (!GOOGLE_CLIENT_ID) missingVars.push('GOOGLE_CLIENT_ID');
    if (!GOOGLE_CLIENT_SECRET) missingVars.push('GOOGLE_CLIENT_SECRET');
    if (!GITHUB_CLIENT_ID) missingVars.push('GITHUB_CLIENT_ID');
    if (!GITHUB_CLIENT_SECRET) missingVars.push('GITHUB_CLIENT_SECRET');
    
    if (missingVars.length > 0) {
        console.error('Missing OAuth credentials:', missingVars.join(', '));
        return false;
    }
    return true;
};

// Only configure OAuth if credentials are available
if (checkOAuthConfig()) {
    // Google OAuth configuration
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${BACKEND_URL}/auth/google/callback`
    }, async (accessToken: string, refreshToken: string, profile: GoogleProfile, done: (error: any, user?: any) => void) => {
        try {
            // Here you would typically:
            // 1. Check if user exists in your database
            // 2. If not, create new user
            // 3. Return user object
            return done(null, profile);
        } catch (error) {
            return done(error as Error);
        }
    }));

    // GitHub OAuth configuration
    passport.use(new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: `${BACKEND_URL}/auth/github/callback`
    }, async (accessToken: string, refreshToken: string, profile: GitHubProfile, done: (error: any, user?: any) => void) => {
        try {
            // Here you would typically:
            // 1. Check if user exists in your database
            // 2. If not, create new user
            // 3. Return user object
            return done(null, profile);
        } catch (error) {
            return done(error as Error);
        }
    }));

    // Google OAuth routes
    UserRouter.get('/google',
        passport.authenticate('google', { scope: ['profile', 'email'] })
    );

    UserRouter.get('/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        (req, res) => {
            // Successful authentication, redirect to frontend
            res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173');
        }
    );

    // GitHub OAuth routes
    UserRouter.get('/github',
        passport.authenticate('github', { scope: ['user:email'] })
    );

    UserRouter.get('/github/callback',
        passport.authenticate('github', { failureRedirect: '/login' }),
        (req, res) => {
            // Successful authentication, redirect to frontend
            res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173');
        }
    );
} else {
    // Fallback routes when OAuth is not configured
    UserRouter.get('/google', (req, res) => {
        res.status(503).json({ error: 'Google OAuth is not configured' });
    });

    UserRouter.get('/github', (req, res) => {
        res.status(503).json({ error: 'GitHub OAuth is not configured' });
    });
}

export default UserRouter;