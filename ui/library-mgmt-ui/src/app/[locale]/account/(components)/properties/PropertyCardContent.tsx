import React, {FC} from 'react';

export interface PropertyCardContentProps {
    rooms: number | string;
    title: string;
    location: any;
    estatePriceType: string;
    estatePrice: string;
    estateAdditionalPrice: string;
    livingArea: string;
}

const PropertyCardContent: FC<PropertyCardContentProps> = ({
                                                               rooms,
                                                               estateAdditionalPrice,
                                                               livingArea,
                                                               estatePrice,
                                                               estatePriceType,
                                                               location,
                                                               title
                                                           }) => {
    return (
        <div className='p-4 space-y-4'>
            <div className="space-y-2">
                    <span className={`text-sm text-neutral-500 dark:text-neutral-400 ${!rooms && 'invisible'}`}>
                         {rooms} rooms
                    </span>
                <span
                    className={`text-sm text-neutral-500 dark:text-neutral-400 ml-2 ${!livingArea && 'invisible'}`}>
                        {livingArea} m<sup>2</sup>
                    </span>
                <div className="flex items-center space-x-2">
                    <h2
                        className={`font-normal capitalize text-lg`}
                    >
                        <span className="line-clamp-1">{title}</span>
                    </h2>
                </div>
                <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                    <span className="line-clamp-2">{location.addressLine1}</span>
                </div>
            </div>
            <div className='border-green-300'>
                <div className="flex justify-start">
                    {estatePrice && (
                        <div className="text-base font-semibold w-44 flex justify-start">
                            <sub className='text-sm mr-2'>{estatePriceType}</sub>
                            <span className='text-xl'>
                                {parseInt(estatePrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                        </div>
                    )}
                    {Boolean(parseInt(estateAdditionalPrice)) && (
                        <span className="text-sm text-green-600 dark:text-neutral-400 font-normal self-end">
                            +{estateAdditionalPrice} {estatePriceType}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyCardContent;
