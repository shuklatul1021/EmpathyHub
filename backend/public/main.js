"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRouter_1 = __importDefault(require("./Routes/UserRouter"));
const MainRouter_1 = __importDefault(require("./Routes/MainRouter"));
const Media_1 = __importDefault(require("./Routes/Media"));
const Community_1 = __importDefault(require("./Routes/Community"));
const Mesages_1 = __importDefault(require("./Routes/Mesages"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
// Debug environment variables
console.log('Environment Variables:');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not Set');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not Set');
console.log('GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID ? 'Set' : 'Not Set');
console.log('GITHUB_CLIENT_SECRET:', process.env.GITHUB_CLIENT_SECRET ? 'Set' : 'Not Set');
// Middleware
app.use((0, cors_1.default)({
    origin: 'https://empathy-hub.vercel.app',
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.JWT_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Serialize user for the session
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
// Deserialize user from the session
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
app.use("/api/v1/user", UserRouter_1.default);
app.use("/api/v1/main", MainRouter_1.default);
app.use("/api/v1/media", Media_1.default);
app.use("/api/v1/community", Community_1.default);
app.use("/api/v1/messages", Mesages_1.default);
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
