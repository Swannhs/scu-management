import React, {FC} from 'react';
import Heading from "@/shared/Heading";
import {EstateInterface} from "@/types/property";
import dynamic from "next/dynamic";

const PropertyCard = dynamic(() => import('@/custom-components/PropertyCard'), {ssr: false});

interface RecentPropertySectionProps {
    properties: EstateInterface[];
}

const RecentPropertySection: FC<RecentPropertySectionProps> = ({properties}) => {
    return (
        <div className='nc-SectionGridFeatureProperty relative tablet:mt-0'>
            <div className='flex flex-col mb-8 relative'>
                <Heading desc='Latest property added'>
                    Recent Listings
                </Heading>
            </div>
            <div
                className={`grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 tablet:grid-cols-2 sm:grid-cols-1 xl:grid-cols-2`}
            >
                {properties?.map((property) => <PropertyCard key={property.id} item={property}/>)}
            </div>
        </div>
    );
};

export default RecentPropertySection;
