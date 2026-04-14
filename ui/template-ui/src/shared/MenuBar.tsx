"use client";

import React, {Fragment, useEffect, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {useLocation} from "react-use";
import NavMobile from "./Navigation/NavMobile";

export interface MenuBarProps {
    className?: string;
    iconClassName?: string;
}

const MenuBar: React.FC<MenuBarProps> = ({
                                             className = "p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300",
                                             iconClassName = "h-7 w-7",
                                         }) => {
    const [isVisable, setIsVisable] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setIsVisable(false);
    }, [location]);

    const handleOpenMenu = () => setIsVisable(true);
    const handleCloseMenu = () => setIsVisable(false);

    const renderContent = () => {
        return (
            <Transition appear show={isVisable} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={handleCloseMenu}>
                    <Transition.Child
                        as={Fragment}
                        enter=" duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave=" duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50"/>
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full ">
                            <Transition.Child
                                as={Fragment}
                                enter="transition duration-100 transform"
                                enterFrom="opacity-0 -translate-x-14"
                                enterTo="opacity-100 translate-x-0"
                                leave="transition duration-150 transform"
                                leaveFrom="opacity-100 translate-x-0"
                                leaveTo="opacity-0 -translate-x-14"
                            >
                                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden transition-all">
                                    <NavMobile onClickClose={handleCloseMenu}/>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        );
    };

    return (
        <>
            <button
                onClick={handleOpenMenu}
                className={`focus:outline-none flex items-center justify-center ${className}`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={iconClassName}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {renderContent()}
        </>
    );
};

export default MenuBar;
