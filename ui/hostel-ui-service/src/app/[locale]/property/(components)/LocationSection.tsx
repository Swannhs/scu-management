"use client";

import React, {useMemo} from "react";
import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import AnyReactComponent from "@/components/AnyReactComponent/AnyReactComponent";
import {GOOGLE_MAPS_API_KEY} from "@/contains/contants";

const LocationSection = () => {
    const [title, setTitle] = React.useState("San Diego, CA, United States of America");
    const center = useMemo(() => ({lat: 44, lng: -80}), []);
    const libraries = useMemo(() => ['places'], []);
    const mapCenter = useMemo(
        () => ({lat: 27.672932021393862, lng: 85.31184012689732}),
        []
    );

    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            disableDefaultUI: true,
            clickableIcons: true,
            scrollwheel: false,
        }),
        []
    );

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY as string,
        libraries: libraries as any,
    });

    if (!isLoaded) {
        return <p>Loading...</p>;
    }
    return (
        <div className="listingSection__wrap">
            {/* HEADING */}
            <div>
                <h2 className="text-2xl font-semibold">Location</h2>
                <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {title}
          </span>
            </div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"/>

            {/* MAP */}
            <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
                <div className="rounded-xl overflow-hidden">
                    <div style={{height: '100vh', width: '100%'}}>
                        <GoogleMap
                            options={mapOptions}
                            zoom={14}
                            center={mapCenter}
                            mapTypeId={google.maps.MapTypeId.ROADMAP}
                            mapContainerStyle={{width: '800px', height: '800px'}}
                            onLoad={() => console.log('Map Component Loaded...')}
                        >
                            <AnyReactComponent lat={mapCenter.lat} lng={mapCenter.lng}/>
                        </GoogleMap>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationSection;
