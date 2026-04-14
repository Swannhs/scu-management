import process from "process";
import {serverSideResponse} from "@/utils/util";

const baseUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
const staticPrefix = process.env.NEXT_PUBLIC_STATIC_SERVICE_PREFIX;

export async function getEstateAdvertiser() {
    const res = await fetch(`${baseUrl}/${staticPrefix}/public/v1/estate-advertiser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return serverSideResponse(res);
}