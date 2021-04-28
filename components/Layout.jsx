import Head from 'next/head'
import { useState, useEffect, useContext } from "react";

import Header from "./shared/header-alt";
import Footer from "./shared/footer";
import { ConfigContext } from "../contexts/ConfigContext";

const Layout = ({ location, title, description, wided, children, className }) => {
  const context = useContext(ConfigContext);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() =>{
      document.addEventListener('scroll', function(e) {
          setScrollPosition(window.scrollY)
      });
  }, []);


  return (
    <div className={`min-h-screen bg-white dark:bg-black ${scrollPosition > 400 ? 'pt-20':''} ${className}`}>
      <Head>
        <title>
          {title ? `${title} | Alejandro Vivas - Frontend Developer` : context.title}
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
