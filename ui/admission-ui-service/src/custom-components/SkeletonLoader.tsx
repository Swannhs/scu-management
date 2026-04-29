import React, {FC} from 'react';
import ContentLoader from "react-content-loader";

interface SkeletonLoaderProps {
    height: string;
    width: string;
}

const SkeletonLoader: FC<SkeletonLoaderProps> = ({height, width}) => {
    return (
        <ContentLoader viewBox="0 0 100% 100%" height={height} width={width}>
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%"/>
        </ContentLoader>
    );
};

export default SkeletonLoader;
