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
                <div className="p-2 md:p-10">
                    <h4 className="mt-5 mb-1 text-2xl font-bold md:mt-10 md:text-4xl">{project.title}</h4>
                    <p className="mb-5 text-lg font-semibold text-gray-500 md:mb-10 md:text-xl">{project.category}</p>

                    <p className="mb-5 text-gray-400 md:mb-10">
                        {project.description}
                    </p>

                    <img className="block mx-auto my-8" src={project.media.img} alt={project.title}/>

                    <div>
                        {
                            project.url && (
                            <Link href={project.url} >
                                <a target="_blank" className="block mb-4 mr-2 text-lg is-primary button">Live preview</a>
                            </Link>
                            )
                        }
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