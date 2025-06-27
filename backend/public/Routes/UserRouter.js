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
const bcrypt_1 = __importDefault(require("bcrypt"));
const import_1 = require("../config/import");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("../middleware/middleware");
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
UserRouter.post("/signup", async (req, res) => {
    const SignUpValidation = type_1.SignUpSchema.safeParse(req.body);
    try {
        if (!SignUpValidation) {
            res.status(403).json({
                message: "Wrong Credential"
            });
            return;
        }
        const UserSigUp = req.body;
        const HashPassword = await bcrypt_1.default.hash(UserSigUp.password, 5);
        const User = await import_1.prismaclient.user.create({
            data: {
                email: UserSigUp.email,
                password: HashPassword,
                username: UserSigUp.username,
                firstname: UserSigUp.firstname,
                latname: UserSigUp.lastname
            }
        });
        if (!User) {
            res.status(403).json({
                message: "Error While Signing Up"
            });
            return;
        }
        res.status(200).json({
            message: "SignUp Succsessfully"
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
UserRouter.post("/login", async (req, res) => {
    const LoginValidation = type_1.LoginSchema.safeParse(req.body);
    if (!LoginValidation) {
        res.status(403).json({
            message: "Wrong Credentials"
        });
        return;
    }
    try {
        const UserLogin = req.body;
        const VerifyEmail = await import_1.prismaclient.user.findFirst({ where: { email: UserLogin.email } });
        if (!VerifyEmail) {
            res.status(403).json({
                message: "Email Not Found"
            });
            return;
        }
        const VerifyPassword = await bcrypt_1.default.compare(UserLogin.password, VerifyEmail.password);
        if (!VerifyPassword) {
            res.status(403).json({
                message: "Incorrect Password"
            });
        }
        const token = await jsonwebtoken_1.default.sign({
            id: VerifyEmail.id
        }, import_1.JWT_SECRET);
        if (!token) {
            res.status(403).json({
                message: "Error While Adding Token"
            });
            return;
        }
        if (token) {
            await import_1.prismaclient.user.update({ data: { isactive: true }, where: { id: VerifyEmail.id } });
        }
        res.status(200).json({
            token: token
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
UserRouter.get("/userdetails", middleware_1.UserAuth, async (req, res) => {
    const userId = req.userId;
    try {
        const UserDetails = await import_1.prismaclient.user.findFirst({ where: { id: userId }, include: { tags: true } });
        if (!UserDetails) {
            res.status(403).json({
                message: "Error While Fething Data"
            });
            return;
        }
        res.status(200).json({
            User: UserDetails
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
UserRouter.get("/alluser", middleware_1.UserAuth, async (req, res) => {
    try {
        const UserId = req.userId;
        const User = await import_1.prismaclient.user.findMany({ where: { id: { not: UserId } }, include: { tags: true } });
        if (!User) {
            res.status(403).json({
                message: "Unable To Find The Users"
            });
            return;
        }
        res.status(200).json({
            users: User
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({});
    }
});
UserRouter.post("/logout", (req, res) => {
});
UserRouter.get("/verify", middleware_1.UserAuth, async (req, res) => {
    try {
        const UserId = req.userId;
        if (UserId) {
            res.status(200).json({
                message: "Verified"
            });
        }
        else {
            res.status(403).json({
                message: "Not Verified"
            });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
UserRouter.post("/updateuserdetails", middleware_1.UserAuth, async (req, res) => {
    try {
        const UserID = req.userId;
        const { firstname, lastname, bio, email } = req.body;
        const UpdateUser = await import_1.prismaclient.user.update({
            data: {
                firstname: firstname,
                latname: lastname,
                bio: bio,
                email: email
            },
            where: {
                id: UserID
            }
        });
        if (!UpdateUser) {
            res.status(403).json({
                message: "Error While Updating"
            });
            return;
        }
        res.status(200).json({
            message: "Details Updated"
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
UserRouter.post("/sendconnectionrequest/:receiverId", middleware_1.UserAuth, async (req, res) => {
    try {
        const senderId = req.userId;
        const receiverId = req.params.receiverId;
        const SendingRequest = await import_1.prismaclient.connectionRequest.create({
            data: {
                senderId: senderId,
                receiverId: receiverId,
                status: "PENDING"
            }
        });
        if (!SendingRequest) {
            res.status(403).json({
                message: "Error While Sending"
            });
            return;
        }
        res.status(200).json({
            message: "Connection Request Sended"
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
UserRouter.post("/connectionreq/:id/status", middleware_1.UserAuth, async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        if (!["ACCEPTED", "REJECTED"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }
        const request = await import_1.prismaclient.connectionRequest.findUnique({
            where: { id },
        });
        if (!request) {
            return res.status(404).json({ message: "Connection request not found" });
        }
        // Step 1: Update existing request
        const updatedStatus = await import_1.prismaclient.connectionRequest.update({
            where: { id },
            data: { status },
        });
        // Step 2: If accepted, insert reverse entry
        if (status === "ACCEPTED") {
            // Check if reverse entry already exists to prevent duplicates
            const reverseExists = await import_1.prismaclient.connectionRequest.findFirst({
                where: {
                    senderId: request.receiverId,
                    receiverId: request.senderId,
                },
            });
            if (!reverseExists) {
                await import_1.prismaclient.connectionRequest.create({
                    data: {
                        senderId: request.receiverId,
                        receiverId: request.senderId,
                        status: "ACCEPTED",
                    },
                });
            }
        }
        res.status(200).json({ message: "Updated successfully" });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
UserRouter.get("/allrequest", middleware_1.UserAuth, async (req, res) => {
    try {
        const UserId = req.userId;
        const AllRequest = await import_1.prismaclient.connectionRequest.findMany({ where: { receiverId: UserId }, include: { sender: { include: { tags: true } } } });
        if (!AllRequest) {
            res.status(403).json({
                message: "Error While Getting Data"
            });
            return;
        }
        res.status(200).json({
            request: AllRequest
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server"
        });
    }
});
UserRouter.get("/getuserdetails/:id", middleware_1.UserAuth, async (req, res) => {
    try {
        const id = req.params.id;
        const UserDetails = await import_1.prismaclient.user.findFirst({ where: { id: id }, include: { tags: true } });
        if (!UserDetails) {
            res.status(403).json({
                message: "Error While Getting Details"
            });
            return;
        }
        res.status(200).json({
            user: UserDetails
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
UserRouter.get("/isconnected/:receiverId", middleware_1.UserAuth, async (req, res) => {
    try {
        const UserId = req.userId;
        const receiverId = req.params.receiverId;
        const isAccepted = await import_1.prismaclient.connectionRequest.findFirst({
            where: {
                OR: [
                    { senderId: UserId, receiverId: receiverId, status: "ACCEPTED" },
                    { senderId: receiverId, receiverId: UserId, status: "ACCEPTED" },
                ]
            }
        });
        const isPending = await import_1.prismaclient.connectionRequest.findFirst({
            where: {
                OR: [
                    { senderId: UserId, receiverId: receiverId, status: "PENDING" },
                    { senderId: receiverId, receiverId: UserId, status: "PENDING" },
                ]
            }
        });
        if (isPending) {
            return res.status(200).json({ message: "PENDING" });
        }
        if (isAccepted) {
            return res.status(200).json({ message: "ACCEPTED" });
        }
        res.status(200).json({ message: "RequestNotSent" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.default = UserRouter;
