import React, {FC, useMemo} from "react";
import Link from "next/link";
import GallerySlider from "@/components/GallerySlider";
import {UserEstateInterface} from "@/types/property";
import PropertyCardContent from "@/app/[locale]/account/(components)/properties/PropertyCardContent";
import {API_PATHS} from "@/contains/contants";

export interface PropertyCardProps {
    className?: string;
    data?: UserEstateInterface;
    size?: "default" | "small";
}
const PropertyCard: FC<PropertyCardProps> = ({size = "default", className = "", data}) => {
    const galleryImgs = useMemo(() => {
        let images: string[] = [];
        if (data?.estateGalleries) {
            data?.estateGalleries.forEach((gallery) => {
                images.push(API_PATHS.IMAGE_URL_PREFIX_BY_USER + gallery.compressedImageName)
            })
        }
        return images;
    }, [data?.estateGalleries]);

    const renderSliderGallery = () => {
        return (
            <div className="relative w-full">
                <GallerySlider
                    uniqueID={`StayCard_${data?.id}`}
                    ratioClass="aspect-w-4 aspect-h-3 "
                    galleryImgs={galleryImgs}
                    href={`/property/${data?.id}`}
                    galleryClass={size === "default" ? undefined : ""}
                />
                {/*<BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]"/>*/}
                {/*{saleOff && <SaleOffBadge className="absolute left-3 top-3"/>}*/}
            </div>
        );
    };

    return (
        <div
            className={`nc-StayCard group relative bg-white dark:bg-neutral-900 ${
                size === "default"
                    ? "border border-neutral-100 dark:border-neutral-800 "
                    : ""
            } rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
            data-nc-id="StayCard"
        >
            {renderSliderGallery()}
            <Link href={`/property/${data?.id}`}>
                <PropertyCardContent
                    estateAdditionalPrice={data?.estateAdditionalPrice as string}
                    rooms={data?.rooms as number}
                    title={data?.title as string}
                    estatePriceType={data?.estatePriceType as string}
                    estatePrice={data?.estatePrice as string}
                    livingArea={data?.livingArea as string}
                    location={data?.location}
                />
            </Link>
        </div>
    );
};

export default PropertyCard;
