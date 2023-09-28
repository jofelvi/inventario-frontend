import {ProviderAuth} from "@hooks/useAuth";
import "antd/dist/antd.css";

import Layout from "../layout/Layout";
import {createGlobalStyle} from "styled-components";
import '../styles/tailwind.css';
import Head from "next/head";
import {DevSupport} from "@react-buddy/ide-toolbox-next";
import {ComponentPreviews, useInitial} from "../dev";


function MyApp({Component, pageProps}) {
    return (
        <>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;800&display=swap"
                    rel="stylesheet"/>
            </Head>
            <ProviderAuth>
                <Layout>
                    <DevSupport
                      ComponentPreviews={ComponentPreviews}
                      useInitialHook={useInitial}
                    >
                        <Component {...pageProps} />
                    </DevSupport>
                </Layout>
            </ProviderAuth>
        </>
    )
}

export default MyApp