import Head from 'next/head'

import Header from "./shared/Header"

const Layout = ({children}) => {
    

    return ( 
        <>
        <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
            <Header/>
            {children}
        </main>

        </>
     );
}
 
export default Layout;