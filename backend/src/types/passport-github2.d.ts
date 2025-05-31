declare module 'passport-github2' {
    import { Strategy as PassportStrategy } from 'passport';
    
    export interface Profile {
        id: string;
        username: string;
        displayName: string;
        profileUrl: string;
        photos?: Array<{ value: string }>;
        emails?: Array<{ value: string }>;
        provider: string;
        _json: any;
    }

    export interface StrategyOptions {
        clientID: string;
        clientSecret: string;
        callbackURL: string;
        scope?: string[];
    }

    export class Strategy extends PassportStrategy {
        constructor(options: StrategyOptions, verify: (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: (error: any, user?: any) => void
        ) => void);
    }
} 