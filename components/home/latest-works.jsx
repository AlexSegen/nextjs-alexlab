import { useContext } from 'react';
import Link from 'next/link'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ConfigContext } from '../../contexts/ConfigContext';

var settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

const ProjectCarousel = () => {

    const { projects } = useContext(ConfigContext);

    return (
        <section className="flex items-center justify-center w-full min-h-screen py-8 text-white bg-black">
            <div className="container mx-auto">
                <div className="px-4">
                    <h2 className="mb-5 text-3xl font-bold text-center md:text-5xl">Recent Projects</h2>

                    <div className="px-4 md:px-0">
                        <Slider {...settings}>

                            {
                                projects.map(project => <Slide key={project.id} project={project}/>)
                            }
                            
                        </Slider>
                    </div>


                </div>
            </div>
        </section>
    )
}

export default ProjectCarousel;

export function Slide({ project }) {
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-12 p-4 md:col-span-4">
                <div className="p-10">
                    <h4 className="mt-10 mb-1 text-4xl font-bold">{project.title}</h4>
                    <p className="mb-10 text-xl font-semibold text-gray-500">{project.category}</p>

                    <p className="mb-10 text-gray-400">
                        {project.description}
                    </p>

                    <img className="block mx-auto my-8" src={project.media.img} alt={project.title}/>

                    <div>
                        <Link href={`/portfolio/details/${project.id}`}>
                            <a className="block mb-4 mr-2 text-lg is-primary button">Project details</a>
                        </Link>
                        <Link href="/portfolio">
                            <a className="block text-lg font-normal underline bg-transparent button">More projects</a>
                        </Link>
                    </div>
                </div>

            </div>

            <div className="hidden col-span-12 p-4 md:block md:col-span-8">
                <div className="p-8">
                    <img src={project.media.img} alt={project.title}/>
                </div>
            </div>
        </div>
    )
}