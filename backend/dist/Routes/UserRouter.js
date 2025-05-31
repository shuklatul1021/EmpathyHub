"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_github2_1 = require("passport-github2");
const type_1 = require("../types/type");
const UserRouter = (0, express_1.default)();
const GOOGLE_CLIENT_ID = "577784310858-sqip14v7hnsbgo0ns9jttumqieaip914.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GITHUB_CLIENT_ID = "Ov23likaWc9eve6DqZpO";
const GITHUB_CLIENT_SECRET = "de1e85870e7d6b32a586175c803843a6e74ab10d";
const BACKEND_URL = 'http://localhost:3000';
// Check if OAuth credentials are configured
const checkOAuthConfig = () => {
    const missingVars = [];
    if (!GOOGLE_CLIENT_ID)
        missingVars.push('GOOGLE_CLIENT_ID');
    if (!GOOGLE_CLIENT_SECRET)
        missingVars.push('GOOGLE_CLIENT_SECRET');
    if (!GITHUB_CLIENT_ID)
        missingVars.push('GITHUB_CLIENT_ID');
    if (!GITHUB_CLIENT_SECRET)
        missingVars.push('GITHUB_CLIENT_SECRET');
    if (missingVars.length > 0) {
        console.error('Missing OAuth credentials:', missingVars.join(', '));
        return false;
    }
    return true;
};
// Only configure OAuth if credentials are available
if (checkOAuthConfig()) {
    // Google OAuth configuration
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${BACKEND_URL}/auth/google/callback`
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // Here you would typically:
            // 1. Check if user exists in your database
            // 2. If not, create new user
            // 3. Return user object
            return done(null, profile);
        }
        catch (error) {
            return done(error);
        }
    }));
    // GitHub OAuth configuration
    passport_1.default.use(new passport_github2_1.Strategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: `${BACKEND_URL}/auth/github/callback`
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // Here you would typically:
            // 1. Check if user exists in your database
            // 2. If not, create new user
            // 3. Return user object
            return done(null, profile);
        }
        catch (error) {
            return done(error);
        }
    }));
    // Google OAuth routes
    UserRouter.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
    UserRouter.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
        // Successful authentication, redirect to frontend
        res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173/dashboard');
    });
    // GitHub OAuth routes
    UserRouter.get('/github', passport_1.default.authenticate('github', { scope: ['user:email'] }));
    UserRouter.get('/github/callback', passport_1.default.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
        // Successful authentication, redirect to frontend
        res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173/dashboard');
    });
}
else {
    UserRouter.get('/google', (req, res) => {
        res.status(503).json({ error: 'Google OAuth is not configured' });
    });
    UserRouter.get('/github', (req, res) => {
        res.status(503).json({ error: 'GitHub OAuth is not configured' });
    });
}
UserRouter.post("/signup", (req, res) => {
    const SignUpValidation = type_1.SignUpSchema.safeParse(req.body);
    try {
        if (!SignUpValidation) {
            res.status(403).send({
                message: "Wrong Credential"
            });
            return;
        }
        const UserSigUp = req.body;
    }
    catch (e) {
    }
});
UserRouter.post("/login", () => {
});
exports.default = UserRouter;
