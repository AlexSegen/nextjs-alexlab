import { useTranslation } from 'react-i18next'
import Layout from '../components/Layout';
import Hero from '../components/home/hero';
import About from '../components/home/about';
// import Features from '../components/home/features';
import ContactBar from '../components/shared/contact-bar';
import LatestWorks from '../components/home/latest-works';

const Home = () => {

    const { t } = useTranslation('home');

    return (
        <Layout wided={true}>
            <Hero/>
            <About/>
            <LatestWorks/>
            <ContactBar
            isDark={true}
            btnText={t('contact_bar.btn')}
            contentText={t('contact_bar.heading')}
            contentSubText={t('contact_bar.sub')}/>
        </Layout>
     );
}
 
export default Home;