import "./global.css";
import { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ts-interface-builder/macro demo</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
