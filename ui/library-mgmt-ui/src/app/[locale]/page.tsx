import React from "react";
import Banner from "@/components/Banner";
import RecentPropertySection from "@/sections/recent-property/RecentPropertySection";
import {getRecentListings} from "@/api/estatePublicApi";

export default async function Home() {
    const recentListing = await getRecentListings();

    return (
        <div className="nc-PageHome2 relative overflow-hidden">
            <div className="relative">
                <Banner/>
            </div>
            <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">

                <div className="relative py-16">
                    <RecentPropertySection properties={recentListing}/>
                </div>
            </div>
        </div>
    );
}
