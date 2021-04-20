import Link from 'next/link'
import styles from './hero.module.scss';

const Hero = () => {

    const base = "button inline-flex py-2 mx-2 px-8 text-xl"
    
    return (
        <div className={`${styles.hero__wrapper}  relative flex items-center justify-center w-full min-h-screen bg-black`}>

            <div className="container mx-auto">
                <div className="relative z-10 flex justify-center w-full p-10 mx-auto text-white">
                    <div className="w-2/4 text-xl text-left">
                        <h4 className="mb-1 text-4xl font-bold text-green-500">Alejandro Vivas</h4>
                        <h1 className="text-5xl font-bold text-white mb-14" id="target">Frontend <span className="border-b-2 border-green-500">Developer</span></h1>
                        <p className="mb-4 font-normal text-gray-300">
                            Hello, I'm Alejandro, currently based in Santiago, Chile. I have 6+ years of experience in software development & IT industry as an IT Professional. I have expertise and experience in JS full stack web development building modern solutions for small and big companies.
                        </p>

                        <div className="mt-4">
                            <dl className="flex items-center mb-4 text-xs font-semibold tracking-wide uppercase">
                                <dd className="flex items-center ">
                                    <svg viewBox="0 0 29 29" width="29" height="29" fill="none" className="flex-none mr-2"><g filter="url(#react-logo-filter-0)"><ellipse cx="14.75" cy="14.106" rx="13.25" ry="5.25" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></ellipse></g><g filter="url(#react-logo-filter-1)"><ellipse cx="14.75" cy="14.099" rx="13.25" ry="5.25" transform="rotate(-60 14.75 14.1)" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></ellipse></g><g filter="url(#react-logo-filter-2)"><ellipse cx="14.75" cy="14.1" rx="13.25" ry="5.25" transform="rotate(-120 14.75 14.1)" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></ellipse></g><circle cx="14.75" cy="14.106" r="2" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle><defs><filter id="react-logo-filter-0" x=".75" y="7.106" width="28" height="13" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="-1"></feOffset><feGaussianBlur stdDeviation=".5"></feGaussianBlur><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix><feBlend in2="shape" result="effect1_innerShadow"></feBlend></filter><filter id="react-logo-filter-1" x="5.964" y=".575" width="17.572" height="26.047" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="-1"></feOffset><feGaussianBlur stdDeviation=".5"></feGaussianBlur><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix><feBlend in2="shape" result="effect1_innerShadow"></feBlend></filter><filter id="react-logo-filter-2" x="5.964" y=".576" width="17.572" height="26.047" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="-1"></feOffset><feGaussianBlur stdDeviation=".5"></feGaussianBlur><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix><feBlend in2="shape" result="effect1_innerShadow"></feBlend></filter></defs></svg>
                                    React
                                </dd>
                                <dd className="flex items-center ml-6">
                                    <svg viewBox="0 0 29 25" width="29" height="25" fill="none" className="flex-none mr-2"><g filter="url(#vue-logo-filter)">
                                        <path d="M18.25.85l-4 6.5-4-6.5H1l13.25 22.5L27.5.85h-9.25z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </g><path d="M18.25.85l-4 6.5-4-6.5H6l8.25 13.5L22.5.85h-4.25z" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><defs><filter id="vue-logo-filter" x=".25" y="-.899" width="28" height="25" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="-1"></feOffset><feGaussianBlur stdDeviation=".5"></feGaussianBlur><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix><feBlend in2="shape" result="effect1_innerShadow"></feBlend></filter></defs></svg>
                                    Vue
                                </dd>
                                <dd className="flex items-center ml-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="25" fill="none" viewBox="0 0 448 448" className="flex-none mr-2">
                                        <g id="angular" transform="translate(-32 -32)">
                                            <path  fill="#1F2937" stroke="#9CA3AF" d="M255.982,64l187.967,69.105-39.17,230.389L255.9,443.443,107.086,363.392,68.031,133.11,255.982,64m0-32L32,112,78.12,384,256,480l177.75-96L480,112,255.981,32Z"/>
                                            <path fill="#9CA3AF" stroke="#4B5563" d="M344,352h40L256,72,128,352h40l26.584-56H317.411ZM213.573,256l42.419-89.356L298.419,256Z"/>
                                        </g>
                                    </svg>
                                    Angular
                                </dd>


                            </dl>
                        </div>

                        <div className="mt-14">
                            <Link href="#contact">
                                <a className={`${base} is-primary`}>Contact me!</a>
                            </Link>
                            <Link href="/portfolio">
                                <a className={`${base} bg-transparent border-transparent inline-flex items-center`}>
                                    My Portfolio
                                    <svg className="w-6 h-6 ml-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="w-2/4">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;
