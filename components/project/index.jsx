import Link  from 'next/link';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

var settings = {
    dots: false,
    autoplay: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

const CheckIcon  = () => <svg className="inline w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>

const ProjectDetails = ({ project }) => {

    return (
        <div className="block grid-cols-12 md:grid">
            <div className="col-span-4 p-4">
                <div className="p-2 md:p-10">
                <h4 className="mt-5 mb-1 text-2xl font-bold text-gray-700 md:mt-10 md:text-4xl dark:text-gray-500">{project.title}</h4>
                <p className="mb-5 text-lg font-semibold text-gray-600 dark:text-gray-500 md:mb-10 md:text-xl">{project.category}</p>

                    <p className="mb-5 text-gray-500 dark:text-gray-400 md:mb-10">
                        {project.description}
                    </p>

                    <div className="mb-10">

                        {
                            project.url  && (<a target="_blank"  href={project.url} className="mb-4 mr-2 text-lg is-primary button">Live preview</a>)
                        }

                        <Link href={`/portfolio`}>
                            <a className="text-lg font-normal button">More projects</a>
                        </Link>
                    </div>

                    <div>

                        {
                            project.tech && (
                                <>
                                    <h3 className="mb-4 font-semibold text-gray-700 dark:text-white">Tech & Tools</h3>
                                    <ul className="mb-4 text-gray-400">

                                        {
                                            project.tech.map(t => (
                                                <li key={t}><CheckIcon/> {t}</li>
                                            ))
                                        }
                                    </ul>
                                </>
                            )
                        }

                        {
                            project.features && (
                                <>
                                    <h3 className="mb-4 font-semibold text-white">Features</h3>
                                    <ul className="mb-4 text-gray-400">

                                        {
                                            project.features.map(f => (
                                                <li key={f}><CheckIcon/> {f}</li>
                                            ))
                                        }
                                    </ul>
                                </>
                            )
                        }
                    </div>
                </div>

            </div>

            <div className="col-span-8 p-2 md:p-4">
                <div className="p-2 md:p-8">

                    <Slider {...settings}>

                    {
                        project.photos.map((photo, index) => <img key={'photo_'+index} src={photo} alt={project.title}/>)
                        
                    }

                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails;