import Layout from '../components/Layout';
import Hero from '../components/home/hero';
import About from '../components/home/about';
// import Features from '../components/home/features';
import ContactBar from '../components/shared/contact-bar';
import LatestWorks from '../components/home/latest-works';

import { useTheme } from '../hooks/useTheme';

const Home = () => {

    const { darkMode } = useTheme();

    return ( 
        <Layout wided={true}>
            <Hero darkMode={darkMode}/>
            <About/>
            <LatestWorks/>
            <ContactBar 
            isDark={true}
            btnText="Let's talk" 
            contentText="Do you have a new project idea?" 
            contentSubText="I could help you make it true."/>
        </Layout>
     );
}
 
export default Home;