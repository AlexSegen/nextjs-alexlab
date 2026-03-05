import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import SocialList from './social-list';
import ContactForm from '../contact/ContactForm';

const Footer = () => {

    const { t } = useTranslation('common');

    return (
        <footer id="contact" className={`px-5 py-20 md:py-10 bg-black relative`}>
            <div className="container relative z-20 grid max-w-6xl grid-cols-8 mx-auto md:flex">
                <div className="hidden w-1/2 p-2 md:p-10 md:block ">
                    <h3 className="mb-4 text-xl font-semibold text-gray-300">{t('footer.sections')}</h3>

                    <nav>
                        <Link href="/" className="block p-2 text-white hover:underline hover:text-green-400">{t('nav.home')}</Link>
                        <Link href="/career" className="block p-2 text-white hover:underline hover:text-green-400">{t('nav.career')}</Link>
                        <Link href="/portfolio/web" className="block p-2 text-white hover:underline hover:text-green-400">Web Design</Link>
                        <Link href="/portfolio/ui" className="block p-2 text-white hover:underline hover:text-green-400">UI Design</Link>
                        <Link href="/#contact" className="block p-2 text-white hover:underline hover:text-green-400">{t('nav.contact')}</Link>
                    </nav>


                </div>
                <div className="w-1/2 col-span-8 p-2 md:p-10">
                    <h3 className="mb-4 text-xl font-semibold text-gray-300">{t('footer.social')}</h3>
                    <p className="mb-6 text-gray-400">{t('footer.reach')}</p>
                    <SocialList/>
                </div>
                <div className="w-full col-span-8 p-2 md:p-10">
                    <h3 className="mb-4 text-xl font-semibold text-gray-300">{t('footer.message_heading')}</h3>
                    <p className="mb-6 text-gray-400">{t('footer.message_sub')}</p>
                    <ContactForm/>
                </div>
            </div>
            
            <div className="text-sm text-center text-gray-600"><strong>{t('footer.copyright')}</strong> 😁 { (new Date()).getFullYear()}</div>
        </footer>
     );
}
 
export default Footer;