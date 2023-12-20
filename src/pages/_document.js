import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect } from 'react'
export default function Document() {
  useEffect(() => {
   
    var isRTL = JSON.parse(localStorage.getItem('isRTL'));
    if (isRTL) {
      var linkDefault = document.getElementById('style-default');
      var userLinkDefault = document.getElementById('user-style-default');
      linkDefault.setAttribute('disabled', true);
      userLinkDefault.setAttribute('disabled', true);
      document.querySelector('html').setAttribute('dir', 'rtl');
    } else {
      var linkRTL = document.getElementById('style-rtl');
      var userLinkRTL = document.getElementById('user-style-rtl');
      linkRTL.setAttribute('disabled', true);
      userLinkRTL.setAttribute('disabled', true);
    }
  }, [])
  return (
    <Html lang="pt">
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/anchor-js/anchor.min.js" defer></script>
        {/* Mirrored from prium.github.io/falcon/v3.18.0/pages/landing.html by HTTrack Website Copier/3.x [XR&CO'2014], Wed, 25 Oct 2023 16:48:18 GMT */}
        {/* Added by HTTrack */}
        <meta httpEquiv="content-type" content="text/html;charset=utf-8" />
        {/* /Added by HTTrack */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* ===============================================*/}
        {/*    Document Title*/}
        {/* ===============================================*/}
        {/* ===============================================*/}
        {/*    Favicons*/}
        {/* ===============================================*/}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="../assets/img/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="../assets/img/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="../assets/img/favicons/favicon-16x16.png"
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="https://prium.github.io/falcon/v3.18.0/assets/img/favicons/favicon.ico"
        />
        <link
          rel="manifest"
          href="https://prium.github.io/falcon/v3.18.0/assets/img/favicons/manifest.json"
        />
        <meta
          name="msapplication-TileImage"
          content="../assets/img/favicons/mstile-150x150.png"
        />
        <meta name="theme-color" content="#ffffff" />
        {/* ===============================================*/}
        {/*    Stylesheets*/}
        {/* ===============================================*/}
        <link href="../vendors/swiper/swiper-bundle.min.css" rel="stylesheet" />
        <link rel="preconnect" href="fonts.gstatic.com/index.html" />
        <link
          href="fonts.googleapis.com/css4e0a.css?family=Open+Sans:300,400,500,600,700%7cPoppins:300,400,500,600,700,800,900&display=swap"
          rel="preconnect"
        />
        <link href="../vendors/simplebar/simplebar.min.css" rel="stylesheet" />
        <link href="../assets/css/theme.css" rel="stylesheet" id="style-default" />
        <link
          href="../assets/css/user.min.css"
          rel="stylesheet"
          id="user-style-default"
        />
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}