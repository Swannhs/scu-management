import React, {FC} from 'react';

interface PropertyNotFoundProps {
    title: string
    description: string
}

const PropertyNotFound:FC<PropertyNotFoundProps> = ({title, description}) => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center">
                <h3 className="text-2xl font-semibold">{title}</h3>
                <p className="text-neutral-500 mt-3">{description}</p>
            </div>
        </div>
    );
};

export default PropertyNotFound;
