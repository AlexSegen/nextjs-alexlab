'use client'

import { ReactNode } from 'react'
import { useScrollPosition } from '@/hooks/use-scroll-position'

const SiteShell = ({ children }: { children: ReactNode }) => {
  const scrollPosition = useScrollPosition()

  return (
    <div className={`min-h-screen bg-black ${scrollPosition > 400 ? 'pt-20' : ''}`}>
      {children}
    </div>
  )
}

export default SiteShell
