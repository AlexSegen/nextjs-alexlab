import { projects } from '@/data/projects'
import ProjectCarousel from '@/components/portfolio/project-carousel'

const LatestWorks = () => (
  <section className="flex items-center justify-center w-full min-h-screen py-8 text-white bg-black">
    <div className="container mx-auto">
      <div className="px-4">
        <h2 className="mb-5 text-3xl font-bold text-center md:text-5xl">Recent Projects</h2>

        <div className="px-4 md:px-0">
          <ProjectCarousel projects={projects} />
        </div>
      </div>
    </div>
  </section>
)

export default LatestWorks
