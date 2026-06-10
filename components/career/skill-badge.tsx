import CheckIcon from '@/components/ui/icons/check-icon'

const SkillBadge = ({ caption }: { caption: string }) => (
  <span className="inline-flex items-center mr-3">
    <CheckIcon />
    {caption}
  </span>
)

export default SkillBadge
