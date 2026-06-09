import Head from 'next/head'
import { useState, useEffect } from "react";

import Header from "./shared/header-alt";
import Footer from "./shared/footer";
import { siteConfig } from "../data/site";

const Layout = ({ location, title, description, wided, children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() =>{
      document.addEventListener('scroll', function(e) {
          setScrollPosition(window.scrollY)
      });
  }, []);


  return (
    <div className={`min-h-screen bg-black ${scrollPosition > 400 ? 'pt-20':''}`}>
      <Head>
        <title>
          {title ? `${title} | Alejandro Vivas - Frontend Developer` : siteConfig.title}
        </title>
        <meta
          name="description"
          content={description || "Alejandro Vivas - Frontend Developer."}
        />
      </Head>
      <Header />

      <main className={wided ? "" : "container mx-auto"}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
