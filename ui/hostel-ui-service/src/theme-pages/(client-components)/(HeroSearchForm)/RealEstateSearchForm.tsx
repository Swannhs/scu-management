"use client";
import React, {FC, useEffect, useState} from "react";
import LocationInput from "./LocationInput";
import PropertyTypeSelect from "./PropertyTypeSelect";
import PriceRangeInput from "./PriceRangeInput";
import {PropertyType} from "../(HeroSearchForm2Mobile)/PropertyTypeSelect";
import {useTranslations} from "next-intl";
import PropertyTypeIcon from "@/shared/icons/PropertyTypeIcon";

export interface RealEstateSearchFormProps {
    haveDefaultValue?: boolean;
}

// DEFAULT DATA FOR ARCHIVE PAGE
const defaultLocationValue = "Tokyo, Jappan";
const defaultPropertyType: PropertyType[] = [
    {
        name: "Duplex House",
        description: "Have a place to yourself",
        checked: true,
    },
    {
        name: "Ferme House",
        description: "Have your own room and share some common spaces",
        checked: false,
    },
    {
        name: "Chalet House",
        description:
            "Have a private or shared room in a boutique hotel, hostel, and more",
        checked: false,
    },
    {
        name: "Maison House",
        description: "Stay in a shared space, like a common room",
        checked: false,
    },
];

const RealEstateSearchForm: FC<RealEstateSearchFormProps> = ({haveDefaultValue = false}) => {
    const t = useTranslations('Index');
    const [locationInputValue, setLocationInputValue] = useState("");
    const [typeOfProperty, setTypeOfProperty] = useState<PropertyType[]>(defaultPropertyType);

    useEffect(() => {
        if (haveDefaultValue) {
            setLocationInputValue(defaultLocationValue);
        }
    }, [haveDefaultValue]);

    return (
        <form
            className="w-full relative xl:mt-8 flex flex-col lg:flex-row lg:items-center rounded-3xl lg:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700 lg:divide-y-0">
            <LocationInput
                defaultValue={locationInputValue}
                onChange={(e) => setLocationInputValue(e)}
                placeHolder='Location'
                className="flex-[1.5]"
            />

            <PropertyTypeSelect
                defaultValue={typeOfProperty}
                onChange={setTypeOfProperty}
            />
                <PropertyTypeIcon/>
            <PriceRangeInput/>
        </form>
    )
};

export default RealEstateSearchForm;
