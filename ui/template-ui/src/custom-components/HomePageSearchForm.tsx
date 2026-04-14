"use client";

import React, {FC} from "react";

interface HomePageSearchFormProps {
    className?: string;
}

const HomePageSearchForm: FC<HomePageSearchFormProps> = ({className = ""}) => {
    return (
        <div
            className={`nc-HeroRealEstateSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
            data-nc-id="HeroRealEstateSearchForm"
        >

        </div>
    );
};

export default HomePageSearchForm;
