"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";

export const Nav = () => {
    const pathname = usePathname();

    return (
        <div className="container">
            <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
                {[
                    {href: "/account/profile", label: "Account"},
                    {href: "/account/properties", label: "Properties"},
                    {href: "/account/wishlist", label: "Wishlist"},
                    {href: "/account/password", label: "password"},
                    {href: "/account/billing", label: "billing"}
                ].map((item) => {
                    const isActive = pathname === "/" + item;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`block py-5 md:py-8 border-b-2 flex-shrink-0  capitalize ${
                                isActive
                                    ? "border-primary-500 font-medium"
                                    : "border-transparent"
                            }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
