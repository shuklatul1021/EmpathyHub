import Router from "express"
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { Strategy as GitHubStrategy } from "passport-github2"
import { Profile as GoogleProfile } from "passport-google-oauth20"
import { Profile as GitHubProfile } from "passport-github2"
import { LoginSchema, SignUpSchema } from "../types/type"
import z, { any } from "zod"
import bcrypt from "bcrypt"
import { JWT_SECRET, prismaclient } from "../config/import"
import jwt from "jsonwebtoken"
import { UserAuth } from "../middleware/middleware"

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
            res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173/dashboard');
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
            res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173/dashboard');
        }
    );
} else {
    UserRouter.get('/google', (req, res) => {
        res.status(503).json({ error: 'Google OAuth is not configured' });
    });

    UserRouter.get('/github', (req, res) => {
        res.status(503).json({ error: 'GitHub OAuth is not configured' });
    });
}

UserRouter.post("/signup" , async(req, res)=>{
    const SignUpValidation  = SignUpSchema.safeParse(req.body);
    try{
        if(!SignUpValidation){
            res.status(403).json({
                message : "Wrong Credential"
            })
            return;
        }
        const UserSigUp : z.infer<typeof SignUpSchema>  = req.body;
        const HashPassword = await bcrypt.hash(UserSigUp.password , 5);
        const User = await prismaclient.user.create({
            data : {
                email : UserSigUp.email,
                password : HashPassword,
                username : UserSigUp.username,
                firstname : UserSigUp.firstname,
                latname : UserSigUp.lastname
            }
        })
        if(!User){
            res.status(403).json({
                message : "Error While Signing Up"
            })
            return;
        }
        res.status(200).json({
            message : "SignUp Succsessfully"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }

})

UserRouter.post("/login" , async(req, res)=>{
    const LoginValidation = LoginSchema.safeParse(req.body);
    if(!LoginValidation){
        res.status(403).json({
            message : "Wrong Credentials"
        })
        return;
    }
    try{
        const UserLogin : z.infer<typeof LoginSchema> = req.body;
        const VerifyEmail = await prismaclient.user.findFirst({ where : { email : UserLogin.email} });
        if(!VerifyEmail){
            res.status(403).json({
                message : "Email Not Found"
            })
            return;
        }
        const VerifyPassword = await bcrypt.compare(UserLogin.password , VerifyEmail.password);
        if(!VerifyPassword){
            res.status(403).json({
                message : "Incorrect Password"
            })
        }

        const token = await jwt.sign({
            id : VerifyEmail.id
        }, JWT_SECRET)

        if(!token){
            res.status(403).json({
                message : "Error While Adding Token"
            })
            return;
        }
        res.status(200).json({
            token : token
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})

UserRouter.get("/userdetails",  UserAuth ,  async(req,res)=>{
    const userId = req.userId;
    try{
        const UserDetails = await prismaclient.user.findFirst({ where : { id : userId} , include : { tags : true }});
        if(!UserDetails){
            res.status(403).json({
                message : "Error While Fething Data"
            })
            return;
        }
        res.status(200).json({
            User : UserDetails
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})

UserRouter.get("/alluser" ,  UserAuth , async(req, res)=>{
    try{
        const UserId = req.userId;
        const User = await prismaclient.user.findMany( { where : { id : { not : UserId} }});
        if(!User){
            res.status(403).json({
                message : "Unable To Find The Users"
            })
            return;
        }
        res.status(200).json({
            users : User
        })
    }catch(e){
        console.log(e);
        res.status(500).json({

        })
    }
})

UserRouter.post("/logout", (req,res)=>{
    
})

UserRouter.get("/verify", UserAuth , async(req,res)=>{
    try{
        const UserId = req.userId;
        if(UserId){
            res.status(200).json({
                message : "Verified"
            })
        }else{
            res.status(403).json({
                message : "Not Verified"
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
    
})


UserRouter.post("/updateuserdetails" , UserAuth , async(req, res)=>{
    try{
        const UserID = req.userId;
        const { firstname , lastname , bio , email } = req.body;
        const UpdateUser = await prismaclient.user.update({
            data : {
                firstname : firstname,
                latname : lastname,
                bio : bio,
                email : email
            },
            where : {
                id : UserID
            }
        })
        if(!UpdateUser){
            res.status(403).json({
                message : "Error While Updating"
            })
            return ;
        }
        res.status(200).json({
            message : "Details Updated"
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})


export default UserRouter;