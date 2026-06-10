'use client'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import ProjectCard from './project-card'
import type { Project } from '@/types'

const settings = {
  dots: false,
  autoplay: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const ProjectCarousel = ({ projects }: { projects: Project[] }) => (
  <Slider {...settings}>
    {projects.map((project) => (
      <ProjectCard key={project.id} project={project} />
    ))}
  </Slider>
)

export default ProjectCarousel
