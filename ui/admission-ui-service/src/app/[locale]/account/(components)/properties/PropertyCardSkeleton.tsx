import React from 'react';

const PropertyCardSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="flex space-x-4 rounded-2">
                <div className="flex-1 my-2">
                    <div className="h-32 bg-gray-300 rounded"></div>
                </div>
            </div>
            <div className='space-y-2'>
                <div className="h-2 bg-gray-300 rounded"></div>
                <div className="h-2 bg-gray-300 rounded"></div>
                <div className="h-2 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
};

export default PropertyCardSkeleton;
