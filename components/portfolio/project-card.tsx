import Image from 'next/image'
import Button from '@/components/ui/button'
import type { Project } from '@/types'

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="grid grid-cols-12">
    <div className="col-span-12 p-4 md:col-span-4">
      <div className="p-2 md:p-10">
        <h4 className="mt-5 mb-1 text-2xl font-bold md:mt-10 md:text-4xl">{project.title}</h4>
        <p className="mb-5 text-lg font-semibold text-gray-500 md:mb-10 md:text-xl">{project.category}</p>

        <p className="mb-5 text-gray-400 md:mb-10">{project.description}</p>

        <Image className="block mx-auto my-8" src={project.media.img} alt={project.title} width={2620} height={1535} />

        <div>
          <Button as="link" href={`/portfolio/${project.catslug}/${project.id}`} variant="primary" className="block mb-4 mr-2 text-lg">
            Project details
          </Button>
          <Button as="link" href="/portfolio" className="block text-lg font-normal underline bg-transparent">
            More projects
          </Button>
        </div>
      </div>
    </div>

    <div className="hidden col-span-12 p-4 md:block md:col-span-8">
      <div className="p-8">
        <Image src={project.media.img} alt={project.title} width={2620} height={1535} />
      </div>
    </div>
  </div>
)

export default ProjectCard
