import Link from 'next/link';
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import Layout from "../components/Layout";
import { ConfigContext } from '../contexts/ConfigContext';


const Skill = ({ caption }) => (
    <span className="inline-flex items-center mr-3">
        <svg className="inline w-6 h-6 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        {caption}
    </span>
);

const ExperienceItem = ({ className, period, company, description, rol }) => (
    <div className={`p-4 mb-4 ${className} relative`}>
        <span className="absolute w-4 h-4 bg-green-400 rounded-full top-14 -left-12"></span>
        <span className="absolute transform rotate-90 -left-14 top-14">{period}</span>
        <h4 className="mb-2 text-xl font-normal text-white">{company}</h4>
        <p className="mb-2 text-base font-semibold text-blue-400">{rol}</p>
        <p>{description}</p>
    </div>
);

const Career = () => {

    const { linkedin, career } = useContext(ConfigContext);
    const { hardSkills, softSkills, tools } = career;
    const { t } = useTranslation('career');

    // const softSkills = t('soft_skills.items', { returnObjects: true });
    const experience = t('experience.items', { returnObjects: true });

    return (
        <Layout wided={true}>
            <div className="relative p-5 overflow-hidden text-center bg-black">
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold text-white">{t('page_title')}</h1>
                    <div className="flex items-center justify-center p-4 text-sm">
                        <Link href="/" className="font-semibold text-gray-400 hover:text-gray-300">
                            {t('nav.home', { ns: 'common' })}
                        </Link>
                        <span className="mx-2 text-gray-500">/</span>
                        <span className="font-semibold text-gray-500">{t('breadcrumb')}</span>
                    </div>
                </div>
                <img src="/img/coding_workspace.jpg" className="absolute top-0 w-full transform -translate-y-1/2 opacity-20" alt="cover" />
            </div>

            <div className="container px-4 py-5 mx-auto text-gray-400 md:py-20 md:px-10 md:grid">

                <div className="grid-cols-12 mb-10 md:grid">
                    <div className="col-span-3 p-2">
                        <h3 className="mb-2 text-xl font-semibold text-white md:mb-4 md:text-3xl">{t('education.title')}</h3>
                        <p className="text-lg">{t('education.degree')}</p>
                        <div className="flex items-center justify-start">
                            <div className="mr-4"><span className="mr-2 opacity-80">{t('education.institute_label')}</span> IUJO</div>
                            <div><span className="mr-2 opacity-80">{t('education.year_label')}</span> 2008</div>
                        </div>
                    </div>
                    <div className="col-span-3 p-2">
                        <h3 className="mb-2 text-xl font-semibold text-white md:mb-4 md:text-3xl">{t('location.title')}</h3>
                        <div className="flex items-center justify-start">
                            <div className="mr-4"><span className="mr-2 opacity-80">{t('location.country_label')}</span> Chile</div>
                            <div><span className="mr-2 opacity-80">{t('location.city_label')}</span> Santiago</div>
                        </div>
                    </div>
                    <div className="col-span-3 p-2">
                        <h3 className="mb-2 text-xl font-semibold text-white md:mb-4 md:text-3xl">{t('languages.title')}</h3>
                        <div className="flex items-center justify-start">
                            <div className="mr-4"><span className="mr-2 opacity-80">{t('languages.spanish_label')}</span> {t('languages.spanish_level')}</div>
                            <div><span className="mr-2 opacity-80">{t('languages.english_label')}</span> {t('languages.english_level')}</div>
                        </div>
                    </div>
                    <div className="col-span-3 p-2">
                        <h3 className="mb-2 text-xl font-semibold text-white md:mb-4 md:text-3xl">{t('contact.title')}</h3>
                        <div className="flex items-center justify-start">
                            <div className="mr-4"><span className="mr-2 opacity-80">{t('contact.phone_label')}</span> <a className="text-blue-400 underline" href="#contact">{t('contact.phone_value')}</a></div>
                            <div><span className="mr-2 opacity-80">{t('contact.linkedin_label')}</span> <a className="text-blue-400 underline" target="_blank" href={linkedin}>Alejandro Vivas</a></div>
                        </div>
                    </div>
                </div>

                <div className="p-2 mb-10">
                    <div className="block grid-cols-12 gap-6 md:grid">
                        <div className="col-span-6 py-2">
                            <div className="p-4 border border-gray-500 border-dashed rounded">
                                <h3 className="mb-4 text-xl font-semibold text-white md:mb-10 md:text-3xl">{t('hard_skills_title')}</h3>
                                <div>
                                    {hardSkills.map((caption) => (
                                        <Skill key={caption} caption={caption} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-6 py-2">
                            <div className="p-4 border border-gray-500 border-dashed rounded">
                                <h3 className="mb-4 text-xl font-semibold text-white md:mb-10 md:text-3xl">{t('soft_skills.title')}</h3>
                                <div>
                                    {softSkills.map((caption) => (
                                        <Skill key={caption} caption={caption} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-2 mb-10">
                    <h3 className="mb-10 text-3xl font-semibold text-white">{t('experience.title')}</h3>

                    <div className="relative pt-4 pl-10 mb-10 border-l-2 border-gray-600 border-opacity-50 border-dashed">
                        <svg className="absolute w-8 h-8 -top-2 -left-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {experience.map((item) => (
                            <ExperienceItem key={item.company} {...item} />
                        ))}
                    </div>
                </div>


                <div className="p-2 mb-10">
                    <div className="block">
                        <div className="py-2">
                            <div className="p-4 border border-gray-500 border-dashed rounded">
                                <h3 className="mb-4 text-xl font-semibold text-white md:mb-10 md:text-3xl">{t('tools_title')}</h3>
                                <div>
                                    {tools.map((caption) => (
                                        <Skill key={caption} caption={caption} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    );
}

export default Career;