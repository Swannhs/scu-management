import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth-options";
import {decrypt} from "@/utils/encryption";

type AuthSession = {
    access_token?: string;
    id_token?: string;
};

export async function getAccessToken() {
    const session = await getServerSession(authOptions as any) as AuthSession | null;
    if (session?.access_token) {
        return decrypt(session.access_token);
    }
    return null;
}

export async function getIdToken() {
    const session = await getServerSession(authOptions as any) as AuthSession | null;
    if (session?.id_token) {
        return session.id_token;
    }
    return null;
}
