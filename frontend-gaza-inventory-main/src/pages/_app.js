import { ProviderAuth } from "@hooks/useAuth";
import "antd/dist/antd.css";

import Layout from "../layout/Layout";
import { createGlobalStyle } from "styled-components";
import '../styles/tailwind.css';
import Head from "next/head";


function MyApp({ Component, pageProps }) {
    return(
        <>
        <Head>
        <link 
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;800&display=swap"
            rel="stylesheet"/>
        </Head>
        <ProviderAuth>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ProviderAuth>
    </>
  )}
  
  export default MyApp