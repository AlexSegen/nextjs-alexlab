import Head from 'next/head'
import { useContext } from "react";

import Header from "./shared/header-alt";
import Footer from "./shared/footer";
import { ConfigContext } from "../contexts/ConfigContext";

const Layout = ({ location, title, description, wided, children }) => {
  const context = useContext(ConfigContext);

  const container = wided ? "" : "container mx-auto";

  return (
    <div className="min-h-screen bg-black">
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

      <main className={`${container}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
