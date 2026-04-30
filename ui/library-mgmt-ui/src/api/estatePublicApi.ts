import process from "process";
import {serverSideResponse} from "@/utils/util";
import {EstateInterface, EstateSingleInterface} from "@/types/property";

const baseUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
const estatePrefix = process.env.NEXT_PUBLIC_ESTATE_SERVICE_PREFIX;

export async function getRecentListings() {
    const res = await fetch(`${baseUrl}/${estatePrefix}/public/v1/estates/recent-listings?limit=8`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return serverSideResponse(res) as EstateInterface[];
}

export async function getEstateById(id: string) {
    const res = await fetch(`${baseUrl}/${estatePrefix}/public/v1/estates/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return serverSideResponse(res) as EstateSingleInterface;
}
