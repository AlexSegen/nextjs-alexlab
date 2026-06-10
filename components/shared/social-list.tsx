import type { ReactNode } from 'react'
import { siteConfig } from '@/data/site'
import TwitterIcon from '@/components/ui/icons/twitter-icon'
import GithubIcon from '@/components/ui/icons/github-icon'
import LinkedinIcon from '@/components/ui/icons/linkedin-icon'

const SocialItem = ({ url, label, children }: { url: string; label: string; children: ReactNode }) => (
  <li className="items-center block">
    <a className="inline-flex items-center text-white hover:text-green-500" href={url} target="_blank" rel="noopener noreferrer">
      {children} {label}
    </a>
  </li>
)

const SocialList = () => (
  <ul className="">
    <SocialItem url={siteConfig.twitter} label="/pixelagil">
      <TwitterIcon />
    </SocialItem>
    <SocialItem url={siteConfig.github} label="/alexsegen">
      <GithubIcon />
    </SocialItem>
    <SocialItem url={siteConfig.linkedin} label="/alejandro-vivas">
      <LinkedinIcon />
    </SocialItem>
  </ul>
)

export default SocialList
