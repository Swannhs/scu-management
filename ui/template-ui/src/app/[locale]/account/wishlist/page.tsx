"use client";

import React, {useEffect, useMemo, useState} from "react";
import {UserEstateInterface, UserEstatesResponseInterface} from "@/types/property";
import {PaginationType} from "@/types/common";
import PropertyCardSkeleton from "@/app/[locale]/account/(components)/properties/PropertyCardSkeleton";
import {toast} from "react-toastify";
import {getUserWishlist} from "@/api/userPrivateApi";
import PropertyCard from "@/app/[locale]/account/(components)/properties/PropertyCard";
import InfiniteScroll from "react-infinite-scroll-component";

export default async function WishListPage() {
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [userEstates, setUserEstates] = useState<UserEstateInterface[]>([]);
    const [totalEstates, setTotalEstates] = useState<Number>(0);
    const [totalPages, setTotalPages] = useState<Number>(0);
    const [pagination, setPagination] = useState<PaginationType>({
        page: 1,
        size: 12,
        orderBy: 'createdAt',
        desc: 'desc'
    });
    const loader = useMemo(() => {
        let loaders = [];
        for (let i = 0; i < 4; i++) {
            loaders.push(<PropertyCardSkeleton/>)
        }
        return loaders;
    }, []);

    useEffect(() => {
        fetchUserWishList(pagination)
            .then((estate) => {
                if (pagination.page === 1) {
                    setUserEstates(estate);
                } else {
                    setUserEstates(userEstates.concat(estate));
                }
                setIsLoading(false);
            })
            .finally(() => setIsLoading(false));
    }, [pagination]);

    const fetchUserWishList = async (pagination) => {
        const response = await getUserWishlist(pagination);
        if (response.status === 200) {
            const {data}: { data: UserEstatesResponseInterface } = await response.json();
            setTotalEstates(data.totalPages);
            setTotalPages(data.totalPages);
            return data.content;
        } else {
            const data = await response.json();
            toast.error(data.message)
        }
    }

    const onPaginationHandler = () => {
        setPagination({
            ...pagination,
            page: pagination.page + 1
        });
    }

    const PropertySection = () => (
        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {userEstates.map((estate) => (
                <PropertyCard key={estate.id} data={estate}/>
            ))}
            {isLoading && loader}
        </div>
    )

    return (
        <div className="space-y-6 sm:space-y-8">
            <div>
                <h2 className="text-3xl font-semibold">Wish List</h2>
            </div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            <InfiniteScroll
                next={onPaginationHandler}
                hasMore={pagination.page <= totalPages}
                dataLength={totalEstates}
                loader={<></>}
            >
                <PropertySection/>
            </InfiniteScroll>
        </div>
    );
}
