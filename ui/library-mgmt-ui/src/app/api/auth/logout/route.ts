import {getServerSession} from "next-auth";
import {authOptions} from "@/app/[locale]/auth/[...nextauth]/route";
import {getIdToken} from "@/utils/sessionTokenAccessor";
import process from "process";

export async function GET() {
    const session = await getServerSession(authOptions as any);

    if (session) {
        const idToken = await getIdToken();

        const baseUrl = `${process.env.NEXT_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`;
        const queryParams = `id_token_hint=${idToken}&post_logout_redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_UI_URL}`;
        let url = `${baseUrl}?${queryParams}`;

        try {
            await fetch(url, {method: "GET"});
        } catch (err) {
            console.error(err);
            // Return a more descriptive error message
            return new Response('An error occurred while logging out', {status: 500});
        }
    }
    return new Response('Logout successful', {status: 200});
}
