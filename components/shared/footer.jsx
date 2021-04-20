import Link from 'next/link'
import SocialList from './social-list';
import ContactForm from '../contact/ContactForm';

const Footer = () => {

    return ( 
        <footer id="contact" className={`px-5 py-10 bg-black relative`}>
            <div className="container relative z-20 flex max-w-6xl mx-auto">
                <div className="w-1/2 p-10">
                    <h3 className="mb-4 text-xl font-semibold text-gray-300">Sections</h3>

                    <nav>
                        <Link href="/"><a className="block p-2 text-white hover:underline hover:text-green-400">Home</a></Link>
                        <Link href="/career"><a className="block p-2 text-white hover:underline hover:text-green-400">Career</a></Link>
                        <Link href="/portfolio/web"><a className="block p-2 text-white hover:underline hover:text-green-400">Web Design</a></Link>
                        <Link href="/portfolio/ui"><a className="block p-2 text-white hover:underline hover:text-green-400">UI Design</a></Link>
                        <Link href="/#contact"><a className="block p-2 text-white hover:underline hover:text-green-400">Contact</a></Link>
                    </nav>
                    
                    
                </div>
                <div className="w-1/2 p-10">
                    <h3 className="mb-4 text-xl font-semibold text-gray-300">Social Network</h3>
                    <p className="mb-6 text-gray-400">You can reach me at</p>
                    <SocialList/>
                </div>
                <div className="w-full p-10">
                    <h3 className="mb-4 text-xl font-semibold text-gray-300">Send me a message</h3>
                    <p className="mb-6 text-gray-400">Leave me a message, I will contact you as soon as possible.</p>
                    <ContactForm/>
                </div>
            </div>
            
            <div className="text-sm text-center text-gray-600"><strong>No copyright</strong> 😁 { (new Date()).getFullYear()}</div>
        </footer>
     );
}
 
export default Footer;