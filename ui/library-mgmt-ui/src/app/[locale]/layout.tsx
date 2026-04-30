import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import React from "react";
import MainNav2 from "@/theme-pages/(client-components)/(Header)/MainNav2";
import {NextIntlClientProvider, useMessages} from "next-intl";
import Footer from "@/components/Footer";
import SessionProviderWrapper from "@/hooks/sessionProviderWrapper";
import {ToastContainer} from "react-toastify";
import ReduxProvider from "@/hooks/ReduxProvider";

import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

export default function RootLayout({children, params: {locale}}: {
    children: React.ReactNode;
    params: any;
}) {
    const messages = useMessages();
    return (
        <SessionProviderWrapper>
            <ReduxProvider>
                <html lang={locale}>
                <head>
                    <title>SCU Library Management</title>
                    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
                    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
                </head>
                <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 theme-library-green">
                <ThemeRegistry>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        <ToastContainer/>
                        {/*<ClientCommons />*/}
                        {/*<SiteHeader />*/}
                        <MainNav2/>

                        {children}

                        {/*<FooterNav />*/}
                        <Footer/>
                    </NextIntlClientProvider>
                </ThemeRegistry>
                </body>
                </html>
            </ReduxProvider>

        </SessionProviderWrapper>
    );
}
