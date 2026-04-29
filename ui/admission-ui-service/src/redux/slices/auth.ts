import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getSession, signIn, signOut} from "next-auth/react";
import {decrypt} from "@/utils/encryption";
import {SessionInterface} from "@/types/user";

export interface AuthState {
    session: SessionInterface | null;
    status: "idle" | "loading" | "authenticated" | "unauthenticated" | "error";
    error?: string;
}

const initialState: AuthState = {
    session: null,
    status: "idle",
};

const parseSession = (session: any): SessionInterface | null => {
    if (!session) return null;
    return {
        access_token: session.access_token ? decrypt(session.access_token) : "",
        expires: session.expires,
        id_token: session.id_token ? decrypt(session.id_token) : "",
        user: {
            name: session.user?.name ?? "",
            email: session.user?.email ?? "",
        },
        roles: session.roles ?? [],
        error: session.error ?? "",
    } as SessionInterface;
};

export const fetchSession = createAsyncThunk("auth/fetchSession", async () => {
    const session = await getSession();
    return parseSession(session);
});

export const triggerLogin = createAsyncThunk("auth/triggerLogin", async (callbackUrl?: string) => {
    await signIn("keycloak", {callbackUrl: callbackUrl ?? "/redirect-after-login"});
    return null;
});

export const triggerLogout = createAsyncThunk("auth/triggerLogout", async () => {
    await signOut({callbackUrl: "/"});
    return null;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchSession.pending, state => {
                state.status = "loading";
                state.error = undefined;
            })
            .addCase(fetchSession.fulfilled, (state, action) => {
                state.session = action.payload;
                state.status = action.payload ? "authenticated" : "unauthenticated";
            })
            .addCase(fetchSession.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message;
            })
            .addCase(triggerLogin.pending, state => {
                state.status = "loading";
            })
            .addCase(triggerLogout.pending, state => {
                state.status = "loading";
            })
            .addCase(triggerLogout.fulfilled, state => {
                state.session = null;
                state.status = "unauthenticated";
            });
    }
});

export const selectSession = (state: { auth: AuthState }) => state.auth.session;
export const selectAuthStatus = (state: { auth: AuthState }) => state.auth.status;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

export default authSlice.reducer;
