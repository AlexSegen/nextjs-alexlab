import Link from 'next/link';
import Layout from "../../components/Layout";
import ContactBar from '../../components/shared/contact-bar';
const Portfolio = () => {

    return ( 
        <Layout wided={true}>
            <div className="relative p-5 overflow-hidden text-center bg-black">
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold text-white ">Portfolio</h1>
                    <div className="p-4 text-sm">
                        <Link href="/">
                            <a className="mr-4 font-semibold text-gray-400 hover:text-gray-300">Home</a>
                        </Link>
                        <span className="font-semibold text-gray-500">Portfolio</span>
                    </div>
                </div>
                <img src="/img/coding_workspace.jpg" className="absolute top-0 w-full transform -translate-y-1/2 opacity-20" alt=""/>
            </div>
            <div className="container grid-cols-10 px-4 py-10 mx-auto text-gray-400 md:py-20 md:px-10 md:grid">

                <Link href="/portfolio/web">
                    <a  className="flex items-center justify-center w-full min-h-full col-span-5 py-10 mb-6 text-5xl font-bold text-center text-white border-2 border-gray-500 border-dashed md:py-40 border-opacity-20 hover:bg-gray-900">
                        <span className="text-gray-400">Web</span>Design   
                    </a>
                </Link>

                <Link href="/portfolio/ui" >
                    <a  className="flex items-center justify-center w-full min-h-full col-span-5 py-10 mb-6 text-5xl font-bold text-center text-white border-2 border-gray-500 border-dashed md:py-40 border-opacity-20 hover:bg-gray-900">
                        <span className="text-gray-400">UI</span>Design   
                    </a>
                </Link>

            </div>

            <ContactBar 
            isDark={true}
            btnText="Let's talk" 
            contentText="Do you have a new project idea?" 
            contentSubText="I could help you make it true."/>
            
        </Layout>
     );
}
 
export default Portfolio;