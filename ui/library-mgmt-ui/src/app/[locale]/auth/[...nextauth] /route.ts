import NextAuth, {Account, NextAuthOptions, Profile, User} from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import {jwtDecode} from "jwt-decode";
import {encrypt} from "@/utils/encryption";
import {AdapterUser} from "next-auth/adapters";
import process from "process";

interface Token {
    access_token?: string;
    id_token?: string;
    expires_at?: number;
    refresh_token?: string;
    decoded?: any;
    error?: string;
}

async function refreshAccessToken(token: Token) {
    const resp = await fetch(`${process.env.NEXT_KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({
            client_id: process.env.NEXT_KEYCLOAK_CLIENT_ID as string,
            client_secret: process.env.NEXT_KEYCLOAK_CLIENT_SECRET as string,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token!,
        }),
        method: "POST",
    });
    const refreshToken = await resp.json();
    if (!resp.ok) throw refreshToken;

    return {
        ...token,
        access_token: refreshToken.access_token,
        decoded: jwtDecode(refreshToken.access_token),
        id_token: refreshToken.id_token,
        expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
        refresh_token: refreshToken.refresh_token,
    } as Token;
}

interface Session {
    access_token?: string;
    id_token?: string;
    roles?: string[];
    error?: string;
}

interface SessionParams {
    session: Session;
    token: Token;
    user: User | AdapterUser;
    account: Account | null;
    profile?: Profile | undefined;
    trigger?: "signIn" | "signUp" | "update" | undefined;
    isNewUser?: boolean | undefined;
}

interface NewSessionParams {
    session: Session;
    token: Token;
    user: User | AdapterUser;
    newSession: any;
    trigger: "update";
}

// @ts-ignore
export const authOptions: NextAuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: `${process.env.NEXT_KEYCLOAK_CLIENT_ID}`,
            clientSecret: `${process.env.NEXT_KEYCLOAK_CLIENT_SECRET}`,
            issuer: `${process.env.NEXT_KEYCLOAK_ISSUER}`,
        }),
    ],

    callbacks: {
        //@ts-ignore
        async jwt(params: {
            token: Token;
            user: User | AdapterUser;
            account: Account | null;
            profile?: Profile | undefined;
            trigger?: "signIn" | "signUp" | "update" | undefined;
            isNewUser?: boolean | undefined;
            session?: any;
        }) {
            const nowTimeStamp = Math.floor(Date.now() / 1000);

            if (params.account) {
                params.token.decoded = jwtDecode(params.account.access_token as string);
                params.token.access_token = params.account.access_token;
                params.token.id_token = params.account.id_token;
                params.token.expires_at = params.account.expires_at;
                params.token.refresh_token = params.account.refresh_token;
                return params.token;
            } else if (nowTimeStamp < params.token.expires_at!) {
                return params.token;
            } else {
                console.log("Token has expired. Will refresh...");
                try {
                    const refreshedToken = await refreshAccessToken(params.token);
                    console.log("Token is refreshed.");
                    return refreshedToken;
                } catch (error) {
                    console.error("Error refreshing access token", error);
                    return {...params.token, error: "RefreshAccessTokenError"} as Token;
                }
            }
        },
        //@ts-ignore
        async session(params: SessionParams | NewSessionParams) {
            params.session.access_token = encrypt(params.token.access_token!);
            params.session.id_token = encrypt(params.token.id_token!);
            params.session.roles = params.token.decoded?.realm_access?.roles;
            params.session.error = params.token.error;
            return params.session;
        },
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
