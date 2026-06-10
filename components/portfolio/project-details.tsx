'use client'

import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Button from '@/components/ui/button'
import CheckIcon from '@/components/ui/icons/check-icon'
import type { Project } from '@/types'

const settings = {
  dots: false,
  autoplay: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const ProjectDetails = ({ project }: { project: Project }) => (
  <div className="block grid-cols-12 md:grid">
    <div className="col-span-4 p-4">
      <div className="p-2 md:p-10">
        <h4 className="mt-2 mb-1 text-2xl font-bold md:mt-10 md:text-4xl">{project.title}</h4>
        <p className="mb-5 text-lg font-semibold text-gray-500 md:text-xl md:mb-10">{project.category}</p>

        <p className="mb-10 text-gray-400">{project.description}</p>

        <div className="mb-10">
          {project.url && (
            <Button as="link" href={project.url} target="_blank" variant="primary" className="mb-4 mr-2 text-lg">
              Preview
            </Button>
          )}

          <Button as="link" href={`/portfolio/${project.catslug}/${project.id}`} className="text-lg font-normal">
            Details
          </Button>
        </div>

        <div>
          {project.tech && (
            <>
              <h3 className="mb-4 font-semibold text-white">Tech & Tools</h3>
              <ul className="mb-4 text-gray-400">
                {project.tech.map((t) => (
                  <li key={t}>
                    <CheckIcon /> {t}
                  </li>
                ))}
              </ul>
            </>
          )}

          {project.features && (
            <>
              <h3 className="mb-4 font-semibold text-white">Features</h3>
              <ul className="mb-4 text-gray-400">
                {project.features.map((f) => (
                  <li key={f}>
                    <CheckIcon /> {f}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>

    <div className="col-span-8 p-2 md:p-4">
      <div className="p-2 md:p-8">
        <Slider {...settings}>
          {project.photos.map((photo, index) => (
            <Image key={'photo_' + index} src={photo} alt={project.title} width={2620} height={1535} />
          ))}
        </Slider>
      </div>
    </div>
  </div>
)

export default ProjectDetails
