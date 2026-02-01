import Head from "next/head";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import PreLoader from "../src/layout/PreLoader";
import "../styles/globals.css";
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const [preloader, setPreloader] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setPreloader(false);
    if (typeof window !== "undefined") {
      window.WOW = require("wowjs");
    }
    new WOW.WOW().init();

    // Dynamically import CSS based on the route
    if (router.pathname.startsWith('/admin')) {
     // import('../src-cms/styles/theme.scss');
    } else {
      import('../public/assets/css/style.css');
    }
  }, [router.pathname]);
  return (
    <>
      <Head>
        <title>ToDistry - A Comprehensive Family Tree Guide To  Building Your Ancestral Chart</title>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/assets/images/icons/favicon.ico"
        />
      </Head>
      {preloader && <PreLoader />}
      <Component {...pageProps} />
      </>
  );
}

export default MyApp;
