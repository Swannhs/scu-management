"use client";

import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import {fetchRecentListings, selectEstateError, selectEstateStatus, selectRecentListings} from "@/redux/slices/estate-public";
import Image from "next/image";
import Link from "next/link";

const SearchComponent = () => {
    const dispatch = useAppDispatch();
    const listings = useAppSelector(selectRecentListings);
    const status = useAppSelector(selectEstateStatus);
    const error = useAppSelector(selectEstateError);

    useEffect(() => {
        dispatch(fetchRecentListings());
    }, [dispatch]);

    return (
        <div className="space-y-6 w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">Latest properties</h1>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">Synced from estate-service API</span>
            </div>

            {status === "loading" && (
                <div className="animate-pulse space-y-3">
                    <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded"/>
                    <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded"/>
                    <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded"/>
                </div>
            )}

            {status === "failed" && (
                <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4 text-sm text-red-700 dark:text-red-200">
                    {error || "Unable to load listings right now."}
                </div>
            )}

            {listings.length > 0 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {listings.map((estate) => {
                        const coverImage = estate.estateGalleries?.find(g => g.isFeaturedImage);
                        return (
                            <div key={estate.id} className="rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden shadow-sm">
                                <div className="relative h-48 w-full bg-neutral-100 dark:bg-neutral-800">
                                    {coverImage ? (
                                        <Image
                                            src={coverImage.compressedImageName}
                                            alt={estate.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-neutral-500 text-sm">No image</div>
                                    )}
                                </div>
                                <div className="p-4 space-y-2">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                                            {estate.title || "Untitled property"}
                                        </h3>
                                        <span className="text-primary-600 font-bold">${estate.estatePrice}</span>
                                    </div>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">{estate.description}</p>
                                    <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                                        <span>{estate.location?.city}</span>
                                        <span>{estate.rooms} rooms</span>
                                    </div>
                                    <Link
                                        href={`/property/${estate.id}`}
                                        className="inline-flex text-sm font-medium text-primary-600 hover:text-primary-700"
                                    >
                                        View details
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {status === "succeeded" && listings.length === 0 && (
                <div className="text-sm text-neutral-500 dark:text-neutral-300">
                    No properties available yet.
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
