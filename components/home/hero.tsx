import Button from '@/components/ui/button'
import ReactLogo from '@/components/ui/icons/react-logo'
import VueLogo from '@/components/ui/icons/vue-logo'
import AngularLogo from '@/components/ui/icons/angular-logo'
import styles from './hero.module.scss'

const Hero = () => {
  const base = 'inline-flex py-2 mx-2 md:px-8 px-4'

  return (
    <div
      className={`${styles.hero__wrapper} relative flex items-center justify-center w-full min-h-screen bg-black md:mt-0 -mt-20 z-0`}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 hidden overflow-hidden md:block">
        <video className="w-full" controls={false} autoPlay muted={true} loop={true}>
          <source src="/img/video.webm" type="video/webm" />
          <source src="/img/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50"></div>
      </div>

      <div className="container pb-20 mx-auto md:pb-0">
        <div className="relative z-10 justify-center block w-full p-4 mx-auto text-white md:p-10 md:flex">
          <div className="text-lg text-left md:w-2/4 md:text-xl">
            <h4 className="mb-1 text-2xl font-bold text-green-500 md:text-4xl">Alejandro Vivas</h4>
            <h1 className="mb-8 text-4xl font-bold text-white md:text-5xl md:mb-14" id="target">
              Frontend <span className="border-b-2 border-green-500">Developer</span>
            </h1>
            <p className="mb-4 font-normal text-gray-300">
              I&apos;m Alejandro, a full-stack JavaScript engineer from Santiago, Chile. With 10+ years in web
              development, I&apos;ve designed and implemented modern solutions across the full stack for diverse
              clients—from early-stage startups to established companies. I&apos;m passionate about building
              performant, scalable applications.
            </p>

            <div className="mt-8 mb:mt-4">
              <dl className="flex items-center mb-4 text-xs font-semibold tracking-wide uppercase">
                <dd className="flex items-center ">
                  <ReactLogo />
                  React
                </dd>
                <dd className="flex items-center ml-6">
                  <VueLogo />
                  Vue
                </dd>
                <dd className="flex items-center ml-6">
                  <AngularLogo />
                  Angular
                </dd>
              </dl>
            </div>

            <div className="flex items-center w-full mt-8 md:mt-14">
              <Button
                as="link"
                href="#contact"
                variant="primary"
                className={`${base} whitespace-nowrap mr-2 text-base md:text-2xl`}
              >
                Contact me!
              </Button>
              <Button
                as="link"
                href="/portfolio"
                className={`${base} bg-transparent border-transparent inline-flex items-center whitespace-nowrap text-base md:text-2xl`}
              >
                My Portfolio
                <svg className="w-6 h-6 ml-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </div>
          </div>
          <div className="hidden w-2/4 md:block"></div>
        </div>
      </div>
    </div>
  )
}

export default Hero
