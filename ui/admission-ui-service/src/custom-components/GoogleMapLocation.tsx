"use client"

import React, {FC} from 'react';
import process from "process";
import GoogleMapReact from "google-map-react";
import LocationMarker from "@/components/AnyReactComponent/LocationMarker";

interface GoogleMapLocationProps {
    lat: number;
    lng: number;
}

const GoogleMapLocation: FC<GoogleMapLocationProps> = ({lat, lng}) => {
    return (
        <GoogleMapReact
            bootstrapURLKeys={{
                key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
            }}
            yesIWantToUseGoogleMapApiInternals
            defaultZoom={15}
            defaultCenter={{
                lat: lat,
                lng: lng,
            }}
        >
            <LocationMarker lat={55.9607277} lng={36.2172614}/>
        </GoogleMapReact>
    );
};

export default GoogleMapLocation;
