import React from "react";
import FormAccountPassword from "@/sections/account-password/FormAccountPassword";

export default async function AccountPasswordPage() {
    return (
        <div className='space-y-6 sm:space-y-8'>
            <h2 className="text-3xl font-semibold">Change Password</h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            <FormAccountPassword/>
        </div>
    )
}