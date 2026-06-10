import type { ExperienceEntry } from '@/types'

const ExperienceItem = ({ className, period, company, description, rol }: ExperienceEntry) => (
  <div className={`p-4 mb-4 ${className} relative`}>
    <span className="absolute w-4 h-4 bg-green-400 rounded-full top-14 -left-12"></span>
    <span className="absolute transform rotate-90 -left-14 top-14">{period}</span>
    <h4 className="mb-2 text-xl font-normal text-white">{company}</h4>
    <p className="mb-2 text-base font-semibold text-blue-400">{rol}</p>
    <p>{description}</p>
  </div>
)

export default ExperienceItem
