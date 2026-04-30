import {SessionProvider} from "next-auth/react";
import {Session} from "next-auth";

interface MyAppProps {
    Component: any;
    pageProps: {
        session: Session;
    };
}

export default function App(props: MyAppProps) {
    const {Component, pageProps: {session}} = props;
    return (
        <SessionProvider session={session}>
            <Component {...props.pageProps} />
        </SessionProvider>
    );
}
