"use client";
import React, {FC, useEffect, useRef, useState} from "react";
import ClearDataButton from "./ClearDataButton";
import {useTranslations} from "next-intl";
import usePlacesAutocomplete from "use-places-autocomplete";
import {countries} from "countries-list";

interface Suggestion {
    description: string;
    place_id: string;
}

type SuggestionsArray = Suggestion[];

export interface LocationInputProps {
    defaultValue: string;
    onChange?: (value: string) => void;
    onInputDone?: (value: string) => void;
    placeHolder?: string;
    desc?: string;
    className?: string;
    autoFocus?: boolean;
}

const LocationInput: FC<LocationInputProps> = ({
    defaultValue,
    autoFocus = false,
    onChange,
    onInputDone,
    placeHolder = "Location",
    desc = "Where are you going?",
    className = "nc-flex-1.5"
}) => {
    const t = useTranslations('Index');
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const COUNTRY_NAMES = Object.values(countries).map(country => country.name);
    const [address, setAddress] = useState(defaultValue);
    const [showPopover, setShowPopover] = useState(false);

    const [options, setOptions] = useState<SuggestionsArray>([]);

    const {
        ready,
        setValue,
        suggestions: {status, data},
    } = usePlacesAutocomplete();

    useEffect(() => {
        setAddress(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        if (eventClickOutsideDiv) {
            document.removeEventListener("click", eventClickOutsideDiv);
        }
        showPopover && document.addEventListener("click", eventClickOutsideDiv);
        return () => {
            document.removeEventListener("click", eventClickOutsideDiv);
        };
    }, [showPopover]);

    useEffect(() => {
        if (showPopover && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showPopover]);

    useEffect(() => {
        setOptions(data || []);
        if (ready) {
            setShowPopover(data?.length > 0);
        }
    }, [data]);

    const eventClickOutsideDiv = (event: MouseEvent) => {
        if (!containerRef.current) return;
        // CLICK IN_SIDE
        if (!showPopover || containerRef.current.contains(event.target as Node)) {
            return;
        }
        // CLICK OUT_SIDE
        setShowPopover(false);
    };

    const removeCountryFromDescription = (description: string) => {
        for (let country of COUNTRY_NAMES) {
            if (description === country) {
                // If the description matches a country name exactly, return it as is
                return description;
            } else if (description.endsWith(country)) {
                // Otherwise, remove the country name from the end of the description
                return description.replace(new RegExp(`,?\\s?${country}$`, 'i'), '').trim();
            }
        }
        return description;
    };

    const handleSelectLocation = (description: string) => {
        const addressWithoutCountry = removeCountryFromDescription(description);
        setAddress(addressWithoutCountry);
        onChange && onChange(addressWithoutCountry);
        onInputDone && onInputDone(addressWithoutCountry);
        setShowPopover(false);
    };

    // const renderRecentSearches = () => {
    //     return (
    //         <>
    //             <h3 className="block mt-2 sm:mt-0 px-4 sm:px-8 font-semibold text-base sm:text-lg text-neutral-800 dark:text-neutral-100">
    //                 {resentSearchTitle}
    //             </h3>
    //             <div className="mt-2">
    //                 {
    //                     options.map((item) => (
    //                         <span
    //                             onClick={() => {
    //                                 handleSelectLocation(item.description)
    //                                 onChange && onChange(item.description);
    //                             }}
    //                             key={item.place_id}
    //                             className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 sm:py-5 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
    //                         >
    //           <span className="block text-neutral-400">
    //             <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 className="h-4 sm:h-6 w-4 sm:w-6"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 stroke="currentColor"
    //             >
    //               <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   strokeWidth={1.5}
    //                   d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    //               />
    //             </svg>
    //           </span>
    //           <span className=" block font-medium text-neutral-700 dark:text-neutral-200">
    //             {item.description}
    //           </span>
    //         </span>
    //                     ))}
    //             </div>
    //         </>
    //     );
    // };

    const renderSearchValue = () => {
        return (
            <>
                {
                    options.map((item) => (
                        <span
                            onClick={() => handleSelectLocation(item.description)}
                            key={item.place_id}
                            className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 sm:py-5 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                        >
                            <span className="block text-neutral-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 sm:h-6 sm:w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </span>
                            <span className="block font-medium text-neutral-700 dark:text-neutral-200 line-clamp-1">
                              {item.description}
                            </span>
                      </span>
                    ))}
            </>
        );
    };

    return (
        <div className={`relative flex ${className}`} ref={containerRef}>
            <div
                className={`flex flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${
                    showPopover ? "nc-hero-field-focused" : ""
                }`}
            >
                <div className="text-neutral-300 dark:text-neutral-400">
                    <span title={t('Location')}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="nc-icon-field"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </span>
                </div>
                <div className="flex-grow">
                    <input
                        className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
                        placeholder={placeHolder}
                        value={address}
                        autoFocus={showPopover}
                        onChange={(e) => {
                            setAddress(e.currentTarget.value);
                            setValue(e.currentTarget.value);
                            onChange && onChange(e.currentTarget.value);
                        }}
                        ref={inputRef}
                        autoComplete={"off"}
                    />
                    <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
                        <span className="line-clamp-1">{!!address ? placeHolder : desc}</span>
                    </span>
                    {address && showPopover && (
                        <ClearDataButton
                            onClick={() => {
                                setAddress("");
                                onChange && onChange("");
                            }}
                        />
                    )}
                </div>
            </div>
            {showPopover && (
                <div
                    className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
                    {/*{address ? renderSearchValue() : renderRecentSearches()}*/}
                    {renderSearchValue()}
                </div>
            )}
        </div>
    );
}

export default LocationInput;
