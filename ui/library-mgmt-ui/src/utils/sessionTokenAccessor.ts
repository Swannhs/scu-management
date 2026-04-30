import {getServerSession} from "next-auth";
import {authOptions} from "@/app/[locale]/auth/[...nextauth]/route";
import {decrypt} from "@/utils/encryption";

export async function getAccessToken() {
    const session = await getServerSession(authOptions as any);
    if (session) {
        return decrypt(session.access_token);
    }
    return null;
}

export async function getIdToken() {
    const session: any = await getServerSession(authOptions as any);
    if (session) {
        return session.id_token;
    }
    return null;
}
