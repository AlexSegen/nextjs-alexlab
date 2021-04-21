import Link from 'next/link';
import { useContext } from 'react'

import Layout from "../components/Layout";
import { ConfigContext } from '../contexts/ConfigContext';

const Career = () => {

    const { linkedin } = useContext(ConfigContext);

    return ( 
        <Layout wided={true}>
            <div className="relative p-5 overflow-hidden text-center bg-black">
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold text-white">Professional Career</h1>
                    <div className="flex items-center justify-center p-4 text-sm">
                        <Link href="/">
                            <a className="font-semibold text-gray-400 hover:text-gray-300">Home</a>
                        </Link>
                        <span className="mx-2 text-gray-500">/</span>
                        <span className="font-semibold text-gray-500">Career</span>
                    </div>
                </div>
                <img src="/img/coding_workspace.jpg" className="absolute top-0 w-full transform -translate-y-1/2 opacity-20" alt="cover"/>
            </div>
            
            <div className="container px-4 py-5 mx-auto text-gray-400 md:py-20 md:px-10 md:grid">
                
                <div className="grid-cols-12 mb-10 md:grid">
                    <div className="col-span-3 p-2">
                        <h3 className="mb-2 text-xl font-semibold text-white md:mb-4 md:text-3xl">Education</h3>
                        <p className="text-lg">Técnico Universitario en Informática</p>
                        <div className="flex items-center justify-start">
                            <div className="mr-4"><span className="mr-2 opacity-80">Institute:</span> IUJO</div>
                            <div><span className="mr-2 opacity-80">Year:</span> 2008</div>
                        </div>
                    </div>
                    <div className="col-span-3 p-2">
                        <h3 className="mb-2 text-xl font-semibold text-white md:mb-4 md:text-3xl">Location</h3>
                        <div className="flex items-center justify-start">
                            <div className="mr-4"><span className="mr-2 opacity-80">Country:</span> Chile</div>
                            <div><span className="mr-2 opacity-80">City:</span> Santiago</div>
                        </div>
                    </div>
                    <div className="col-span-3 p-2">
                        <h3 className="mb-2 text-xl font-semibold text-white md:mb-4 md:text-3xl">Languages</h3>
                        <div className="flex items-center justify-start">
                            <div className="mr-4"><span className="mr-2 opacity-80">Spanish:</span> Native</div>
                            <div><span className="mr-2 opacity-80">English:</span> Professional</div>
                        </div>
                    </div>
                    <div className="col-span-3 p-2">
                        <h3 className="mb-2 text-xl font-semibold text-white md:mb-4 md:text-3xl">Contact</h3>
                        <div className="flex items-center justify-start">
                            <div className="mr-4"><span className="mr-2 opacity-80">Phone:</span> <a className="text-blue-400 underline" href="#contact">Contact me</a></div>
                            <div><span className="mr-2 opacity-80">Linkedin:</span> <a className="text-blue-400 underline" target="_blank" href={linkedin}>Alejandro Vivas</a></div>
                        </div>
                    </div>
                </div>

                <div className="p-2 mb-10">
                    <div className="block grid-cols-12 gap-6 md:grid">
                        <div className="col-span-6 py-2">
                            <div className="p-4 border border-gray-500 border-dashed rounded">
                                <h3 className="mb-4 text-xl font-semibold text-white md:mb-10 md:text-3xl">Hard Skills</h3>
                                <div>
                                    <Skill caption="JavaScript / TypeScript"/>
                                    <Skill caption="NodeJS"/>
                                    <Skill caption="React JS"/>
                                    <Skill caption="Angular"/>
                                    <Skill caption="Vue JS"/>
                                    <Skill caption="UI / UX Design"/>
                                    <Skill caption="Responsive Design"/>
                                    <Skill caption="Agile / Scrum"/>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-6 py-2">
                            <div className="p-4 border border-gray-500 border-dashed rounded">
                                <h3 className="mb-4 text-xl font-semibold text-white md:mb-10 md:text-3xl">Soft Skills</h3>
                                <div>
                                    <Skill caption="Problem Solving"/>
                                    <Skill caption="Critical Thinking"/>
                                    <Skill caption="Team Work"/>
                                    <Skill caption="Curiosity"/>
                                    <Skill caption="Communicative"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-2 mb-10">
                    <h3 className="mb-10 text-3xl font-semibold text-white">Experience</h3>

                    <div className="relative pt-4 pl-10 mb-10 border-l-2 border-gray-600 border-opacity-50 border-dashed">
                        <svg className="absolute w-8 h-8 -top-2 -left-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <ExperienceItem
                            className="bg-gray-800"
                            company = "Chileautos SpA (Carsales Network)"
                            period="2018 - now"
                            rol="Software Engineer"
                            description="Using agile methods, responsible for mantaining and building new solutions for retail vehicles ecommerces in different countries around Carsales Co. Network. Developing frontend and backend solutions using Reactjs, Angular, VueJS, NetCore C#, CI/CD, AWS, NodeJS apps and functional programming."
                        />
                        <ExperienceItem
                            className="bg-gray-900"
                            company = "Freelance"
                            period="2012 - now"
                            rol="Frontend Developer / Web Designer / Web Developer"
                            description="I build websites for small and big companies to help them have presence on Internet using different web technologies. Also responsible for create new UI Designs to enchance existing web/apps visual presentation."
                        />
                        <ExperienceItem
                            className="bg-gray-800"
                            company = "Dotworkers Venezuela C.A."
                            period="2012 - 2018"
                            rol="Graphic Designer / UI Designer / Creative Department Chief"
                            description="Responsible for designing interfaces and templates for White Labels (Web Sites and Web Apps). Design and build new product landing pages using different stacks such as PHP Laravel, VueJS,  JQuery and modern toolchain (Webpack, GulpJS, NPM)."
                        />
                        <ExperienceItem
                            className="bg-gray-900"
                            company = "LCC C.A."
                            period="2008 - 2012"
                            rol="Network Administrator and HelpDesk"
                            description="Responsible for keeping a company’s computer network running seamlessly and up-to-the-minute. It also involved  more tan 50 computers systems, software applications and hardware around the company."
                        />
                    </div>
                </div>

            
                <div className="p-2 mb-10">
                    <div className="block">
                        <div className="py-2">
                            <div className="p-4 border border-gray-500 border-dashed rounded">
                                <h3 className="mb-4 text-xl font-semibold text-white md:mb-10 md:text-3xl">Tools I use</h3>
                                <div>
                                    <Skill caption="Jira"/>
                                    <Skill caption="Postman"/>
                                    <Skill caption="Api Rest"/>
                                    <Skill caption="Git"/>
                                    <Skill caption="VS Code"/>
                                    <Skill caption="Terminal"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
     );
}


function Skill({caption}) {

    return (
        <span className="inline-flex items-center mr-3">
            <svg className="inline w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            {caption}
        </span>
    )

}


function ExperienceItem({className, period, company, description, rol}){
    return (
    <div className={`p-4 mb-4 ${className} relative`}>
        <span className="absolute w-4 h-4 bg-green-400 rounded-full top-14 -left-12"></span>
        <span className="absolute transform rotate-90 -left-14 top-14">{period}</span>
        <h4 className="mb-2 text-xl font-normal text-white">{company}</h4>
        <p className="mb-2 text-base font-semibold text-blue-400">{rol}</p>
        <p>{description}</p>
    </div>
    )
}
 
export default Career;