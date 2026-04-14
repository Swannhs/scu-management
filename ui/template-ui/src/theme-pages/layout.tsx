// import { Poppins } from "@next/font/google";
import SiteHeader from "./(client-components)/(Header)/SiteHeader";
import ClientCommons from "./ClientCommons";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import Footer from "@/components/Footer";
import FooterNav from "@/components/FooterNav";
import React from "react";

//

// const poppins = Poppins({
//   subsets: ["latin"],
//   display: "optional",
//   weight: ["100", "300", "400", "500", "600", "700", "800"],
// });

export default function RootLayout({
                                       children,
                                       params,
                                   }: {
    children: React.ReactNode;
    params: any;
}) {
    return (
        <html lang="en">
        <head/>
        <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <ClientCommons/>
        <SiteHeader/>

        {children}

        <FooterNav/>
        <Footer/>
        </body>
        </html>
    );
}
