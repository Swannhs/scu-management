import process from "process";
import {UserInfoInterface} from "@/types/user";
import {getAccessToken} from "@/utils/sessionTokenAccessor";
import {PaginationType} from "@/types/common";

const baseUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
const userPrefix = process.env.NEXT_PUBLIC_USER_SERVICE_PREFIX;

export async function getUserInfo() {
    let accessToken = await getAccessToken();
    return await fetch(`${baseUrl}/${userPrefix}/api/v1/user-info`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
}

export async function updateUserInfo(userInfo: UserInfoInterface) {
    return await fetch(`/api/user-info`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    });
}

export async function getUserEstate(pagination: PaginationType) {
    return fetch(`/api/user-estate?page=${pagination.page}&size=${pagination.size}&orderBy=${pagination.orderBy}&desc=${pagination.desc}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function getUserWishlist(pagination: PaginationType) {
    return fetch(`/api/user-wishlist?page=${pagination.page}&size=${pagination.size}&orderBy=${pagination.orderBy}&desc=${pagination.desc}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
