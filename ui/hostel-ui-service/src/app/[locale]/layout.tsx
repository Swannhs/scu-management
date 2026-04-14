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
                    <title>Fortunatis Homes</title>
                </head>
                <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <ToastContainer/>
                    {/*<ClientCommons />*/}
                    {/*<SiteHeader />*/}
                    <MainNav2/>

                    {children}

                    {/*<FooterNav />*/}
                    <Footer/>
                </NextIntlClientProvider>
                </body>
                </html>
            </ReduxProvider>

        </SessionProviderWrapper>
    );
}
