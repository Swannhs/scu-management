"use client";

import React, {FC, useEffect} from "react";
import Link from "next/link";
import ButtonPrimary from "@/shared/ButtonPrimary";
import {useSession} from "next-auth/react";
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {fetchSession, selectAuthStatus, selectSession, triggerLogin, triggerLogout} from "@/redux/slices/auth";

const Page: FC = () => {
    const {status: sessionStatus} = useSession();
    const dispatch = useAppDispatch();
    const session = useAppSelector(selectSession);
    const authStatus = useAppSelector(selectAuthStatus);

    useEffect(() => {
        dispatch(fetchSession());
    }, [dispatch, sessionStatus]);

    const onLogin = () => {
        dispatch(triggerLogin());
    };

    const onLogout = () => {
        dispatch(triggerLogout());
    };

    return (
        <div className={`nc-PageLogin`}>
            <div className="container mb-24 lg:mb-32">
                <h2
                    className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                    Login
                </h2>

                <div className="max-w-md mx-auto space-y-6">
                    {authStatus === "loading" && (
                        <div className="rounded-md bg-neutral-100 dark:bg-neutral-800 p-4 text-sm text-neutral-600 dark:text-neutral-200">
                            Preparing sign-in...
                        </div>
                    )}

                    {session && (
                        <div className="rounded-md bg-green-50 dark:bg-green-900/30 p-4 text-sm text-green-700 dark:text-green-200 space-y-1">
                            <p className="font-semibold">You are signed in</p>
                            <p className="text-xs">{session.user.email}</p>
                        </div>
                    )}

                    {!session && (
                        <div className="rounded-md bg-neutral-50 dark:bg-neutral-900/50 p-6 border border-neutral-200 dark:border-neutral-700 space-y-4">
                            <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                Continue with your Fortunatis Homes account to manage bookings and wishlist.
                            </p>
                            <ButtonPrimary type="button" onClick={onLogin}>
                                Continue with Keycloak
                            </ButtonPrimary>
                        </div>
                    )}

                    {session && (
                        <div className="space-y-3">
                            <ButtonPrimary type="button" onClick={onLogout}>
                                Sign out
                            </ButtonPrimary>
                            <Link href="/" className="block text-center text-primary-600 font-medium">
                                Back to home
                            </Link>
                        </div>
                    )}

                    <span className="block text-center text-neutral-700 dark:text-neutral-300">
                        New user? {` `}
                        <Link href="/signup" className="font-semibold underline">
                            Create an account
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Page;
