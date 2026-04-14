import {getServerSession} from "next-auth";
import {authOptions} from "@/app/[locale]/auth/[...nextauth]/route";
import {getAccessToken} from "@/utils/sessionTokenAccessor";
import process from "process";
import {NextResponse} from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
const userPrefix = process.env.NEXT_PUBLIC_USER_SERVICE_PREFIX;

export async function GET(req: Request) {
    const session = await getServerSession(authOptions as any);
    if (session) {
        let accessToken = await getAccessToken();
        const {searchParams} = new URL(req.url);
        const page = searchParams.get('page') || "0";
        const size = searchParams.get('size') || "10";
        const orderBy = searchParams.get('orderBy') || "creationDate";
        const desc = searchParams.get('desc') || "true";

        const res = await fetch(`${baseUrl}/${userPrefix}/v1/user-wishlist?page=${page}&size=${size}&orderBy=${orderBy}&desc=${desc}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        });
        const data = await res.json();
        return NextResponse.json(data);
    }
    return NextResponse.json({message: "Unauthorized", status: 401})
}
