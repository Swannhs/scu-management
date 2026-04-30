import React from "react";
import {getEstateById} from "@/api/estatePublicApi";
import Image from "next/image";
import {API_PATHS} from "@/contains/contants";
import {Squares2X2Icon} from "@heroicons/react/24/outline";
import {currencyFormatter} from "@/utils/currencyFormatter";
import LocationSection from "@/app/[locale]/property/(components)/LocationSection";

export default async function PropertyDetailPage({params}: { params: { propertyId: string } }) {
    const property = await getEstateById(params.propertyId);

    const availabilitySection = () => {
        return (
            <div className="listingSection__wrap">
                <div>
                    <h2 className="text-2xl font-semibold">
                        propertyDetails.property.availability
                    </h2>
                    <div className='grid grid-cols-2 mt-4'>
                        <p>propertyDetails.property.available.from: </p>
                        <p>{property?.estateAvailabilityPolicy?.split("_").filter((item: string) => item.trim()).join(' ')}</p>
                    </div>
                </div>
            </div>
        );
    };

    const priceSection = () => (
        <div className="listingSection__wrap">
            <div>
                <h2 className="text-2xl font-semibold">
                    'propertyDetails.property.cost'
                </h2>
                <div className='grid grid-cols-2 mt-4'>
                    <p className='capitalize'>{property?.estateAdvertisePurpose} : </p>
                    <div className='flex'>
                        <h2 className='text-2xl font-bold'>&nbsp;
                            {currencyFormatter(property?.estatePrice as unknown as string)}
                        </h2>
                        <span className='mt-1 ml-2 text-xs font-semibold'>{property?.estatePriceType}</span>
                        {
                            parseInt(property?.estateAdditionalPrice as unknown as string) > 0 && (
                                <span className='text-green-600 mt-1.5'>+
                                    {currencyFormatter(property?.estateAdditionalPrice as unknown as string)}
                                </span>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    )

    const mainInformation = () => (
        <div className="listingSection__wrap">
            <div>
                <h2 className="text-2xl font-semibold">
                    propertyDetails.property.main.information
                </h2>
                <div className='grid grid-cols-2 mt-4'>
                    <p>propertyDetails.property.main.information.type : </p>
                    <p>{property?.estateType}</p>
                </div>
                <div className='grid grid-cols-2 mt-4'>
                    <p>propertyDetails.property.main.information.no.of.rooms : </p>
                    <p>{property?.rooms}</p>
                </div>
                <div className='grid grid-cols-2 mt-4'>
                    <p>addProperty.property.room.height : </p>
                    <p>{property?.estateRoomHeight} <span className='text-xs'>m</span></p>
                </div>
                <div className='grid grid-cols-2 mt-4'>
                    <p>propertyDetails.property.main.information.floor : </p>
                    <p>{property?.estateFloor}</p>
                </div>
                <div className='grid grid-cols-2 mt-4'>
                    <p>propertyDetails.property.main.information.floor.space : </p>
                    <p>{property?.estateFloorSpace} <span className='text-xs'>m<sup>2</sup></span></p>
                </div>
                <div className='grid grid-cols-2 mt-4'>
                    <p>addProperty.property.living.space : </p>
                    <p>{property?.livingArea} <span className='text-xs'>m<sup>2</sup></span></p>
                </div>
                <div className='grid grid-cols-2 mt-4'>
                    <p>addProperty.property.lot.area : </p>
                    <p>{property?.estateLotArea} <span className='text-xs'>m<sup>2</sup></span></p>
                </div>
                <div className='grid grid-cols-2 mt-4'>
                    <p>propertyDetails.property.main.information.year.built : </p>
                    <p>{property?.estateYearOfBuilding}</p>
                </div>
                <div className='grid grid-cols-2 mt-4'>
                    <p>propertyDetails.property.main.information.year.renovation</p>
                    <p>{property?.estateYearOfRenovation}</p>
                </div>
            </div>
        </div>
    )

    const featuresSection = () => (
        <div className="listingSection__wrap">
            <div>
                <h2 className="text-2xl font-semibold">
                    propertyDetails.property.main.features
                </h2>
                <ul className='grid grid-cols-2 mt-4 list-disc px-4'>
                    {
                        property?.estateFeatures?.map((item) => {
                            return (
                                <li key={item.id}>{item.featuresTitle}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )

    const videoSection = () => (
        <div className="listingSection__wrap">
            <h2 className="text-2xl font-semibold">
                propertyDetails.property.video
            </h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            {/*<iframe*/}
            {/*    className="w-full h-96 mt-4"*/}
            {/*    src={`${property?.videoUrl as string}`}*/}
            {/*    title="YouTube video player"*/}
            {/*    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
            {/*    allowFullScreen></iframe>*/}
        </div>
    )

    const blogSection = () => {
        return (
            <div className="listingSection__wrap">
                <h2 className="text-2xl font-semibold">{property?.title}</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                <div className="text-neutral-6000 dark:text-neutral-300">
                    {/*<div dangerouslySetInnerHTML={{__html: property?.description as string}}/>*/}
                </div>
            </div>
        );
    };

    return (
        <div className="nc-ListingStayDetailPage">
            {/*  HEADER */}
            <header className="container 2xl:px-14 rounded-md sm:rounded-xl">
                <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
                    <div
                        className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                        // onClick={handleOpenModalImageGallery}
                    >
                        {
                            property?.estateGalleries?.length > 0 && (
                                <Image
                                    fill
                                    className="object-cover rounded-md sm:rounded-xl"
                                    src={API_PATHS.IMAGE_URL_PREFIX_BY_USER + property.estateGalleries[0].compressedImageName}
                                    alt=""
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                />
                            )
                        }

                        <div
                            className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
                        {property?.estateGalleries?.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
                            <div
                                key={index}
                                className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                                    index >= 3 ? "hidden sm:block" : ""
                                }`}
                            >
                                <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                                    <Image
                                        fill
                                        className="object-cover rounded-md sm:rounded-xl "
                                        src={API_PATHS.IMAGE_URL_PREFIX_BY_USER + item.compressedImageName}
                                        alt=""
                                        sizes="400px"
                                    />
                                </div>

                                {/* OVERLAY */}
                                <div
                                    className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                                    // onClick={handleOpenModalImageGallery}
                                />
                            </div>
                        ))}
                        <button
                            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
                            // onClick={handleOpenModalImageGallery}
                        >
                            <Squares2X2Icon className="w-5 h-5"/>
                            <p className="ml-2 text-neutral-800 text-sm font-medium">
                                Show all photos
                            </p>
                        </button>
                    </div>
                </div>
            </header>

            <main className="container relative z-10 mt-11 flex flex-col lg:flex-row">
                {/* CONTENT */}
                <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
                    {availabilitySection()}
                    {priceSection()}
                    {mainInformation()}
                    {featuresSection()}
                    {property?.videoUrl !== '' && videoSection()}
                    {blogSection()}
                    <LocationSection/>
                    {/*{renderSection7()}*/}
                    {/*{renderSection8()}*/}
                </div>

                {/* SIDEBAR */}
                <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
                    {/*<div className="sticky top-28">{renderSidebar()}</div>*/}
                </div>
            </main>
        </div>
    );
};
