import React from "react";
import logoImg from "@/images/logo.png";
import logoLightImg from "@/images/logo-light.png";
import {StaticImageData} from "next/image";
import Link from "next/link";

export interface LogoProps {
    img?: StaticImageData;
    imgLight?: StaticImageData;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({
                                       img = logoImg,
                                       imgLight = logoLightImg,
                                       className = "w-24",
                                   }) => {
    return (
        <Link
            href="/"
            className={`ttnc-logo inline-block text-black dark:text-white w-fit`}
        >
            {/*<LogoSvgLight/>*/}
            {/*<LogoSvg/>*/}
            <h1 className='lg:text-2xl md:text-2xl border-l-4 border-green-600 pl-2 tracking-wider'
                style={{fontFamily: 'sans-serif'}}>
                <span className='tablet:hidden' style={{fontWeight: 600}}>FortunatisHomes</span>
                <span className='hidden tablet:block' style={{fontWeight: 600}} title='FortunatisHomes'>
                    FH
                </span>
            </h1>
        </Link>
    );
};

export default Logo;
