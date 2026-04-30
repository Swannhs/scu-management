import React from "react";
import SearchComponent from "@/sections/search/SearchComponent";

export default function SearchPage() {
    return (
        <div className={`nc-CheckOutPage`} data-nc-id="CheckOutPage">
            <main className="container mt-11 mb-24 lg:mb-32 flex justify-center">
                <div
                    className="w-full tablet:w-3/5 tablet-landscape:w-3/5 lg:w-3/5 xl:w-3/5 lg:pr-10">
                    <SearchComponent/>
                </div>
            </main>
        </div>
    );
}