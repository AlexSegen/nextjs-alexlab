import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react';

import { ConfigContext } from '../../contexts/ConfigContext';

import Layout from "../../components/Layout";
import ProjectDetails from '../../components/project';

const FilteredPortfolio = () => {

    const router = useRouter()
    const { catslug } = router.query

    const { projects } = useContext(ConfigContext);

    const [filtered, setFiltered] = useState([]);

    const handleFiltered = slug => {

        const isApplicable = ['web', 'ui'].some(item => item ===  slug.toString().trim().toLowerCase());

        if (isApplicable) {
            setFiltered(projects.filter(p => p.catslug === catslug));
        } else {
            router.push('/portfolio')
        }
    }

    useEffect(() => {
        if(catslug)
            handleFiltered(catslug);
    }, [catslug])

    return ( 
        <Layout wided={true}>
            <div className="relative p-5 overflow-hidden text-center bg-black">
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold text-white ">Portfolio</h1>
                    <div className="flex items-center justify-center p-4 text-sm">
                        <Link href="/">
                            <a className="font-semibold text-gray-400 hover:text-gray-300">Home</a>
                        </Link>
                        <span className="mx-2 text-gray-500">/</span>
                        <Link href="/portfolio">
                            <a className="font-semibold text-gray-400 hover:text-gray-300">Portfolio</a>
                        </Link>
                        <span className="mx-2 text-gray-500">/</span>
                        <span className="font-semibold text-gray-500"><span className="uppercase">{ catslug } </span>Design</span>
                    </div>
                </div>
                <img src="/img/coding_workspace.jpg" className="absolute top-0 w-full transform -translate-y-1/2 opacity-20" alt=""/>
            </div>
            <div className="container py-5 mx-auto text-gray-400 md:py-20">
                <h2 className="mb-2 text-4xl font-bold text-center text-white md:mb-6 md:text-left md:text-5xl"><span className="text-gray-400 uppercase">{catslug}</span>Design</h2>

                {
                    filtered.map(project => (
                        <div key={project.id} className="p-4 rounded">
                            <ProjectDetails project={project}/>
                        </div>
                    ))
                }
                
            </div>
        </Layout>
     );
}
 
export default FilteredPortfolio;