import React from "react";
import FormAccountInfo from "@/sections/account/FormAccountInfo";
import {getUserInfo} from "@/api/userPrivateApi";

export default async function AccountPage() {
    const response = await getUserInfo();
    const userInfo = await response.json();

    return (
        <div className="space-y-6 sm:space-y-8">
            {/* HEADING */}
            <h2 className="text-3xl font-semibold">Account information</h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            <FormAccountInfo userInfo={userInfo}/>
        </div>
    );
};
