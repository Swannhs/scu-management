import {getServerSession} from "next-auth";
import {authOptions} from "@/app/[locale]/auth/[...nextauth]/route";
import {getAccessToken} from "@/utils/sessionTokenAccessor";
import process from "process";
import {NextResponse} from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
const userPrefix = process.env.NEXT_PUBLIC_USER_SERVICE_PREFIX;

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions as any);
    if (session) {
        let accessToken = await getAccessToken();
        const userInfo = await req.json();
        const res = await fetch(`${baseUrl}/${userPrefix}/v1/user-info`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify(userInfo)
        });
        if (res.ok) {
            return NextResponse.json({message: "User info updated", status: res.status});
        }
        return NextResponse.json({message: "User info update failed", status: res.status});
    }
    return NextResponse.json({message: "Unauthorized", status: 401})
}
