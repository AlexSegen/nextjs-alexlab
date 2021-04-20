import React from 'react'

const Features = () => {
    return (
        <section className="flex items-center justify-center w-full min-h-screen py-8 text-white bg-black">
            <div className="container mx-auto">
                <div className="px-4">
                    <h2 className="mb-5 text-5xl font-bold text-center">How is my work?</h2>
                    <div className="grid grid-cols-12">

                        <div className="col-span-3 p-4">
                            <div className="p-4 my-2 text-center rounded">
                                <svg className="inline h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                <h4 className="mb-2 text-lg font-semibold text-white">Responsive Design</h4>
                                <p className="text-gray-400">Solutions 100% adaptatives, making it possible to look great on any screen devices.</p>
                            </div>

                            <div className="p-4 my-2 text-center bg-gray-900 rounded">
                                <svg className="inline h-8 mb-2 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <h4 className="mb-2 text-lg font-semibold text-white">Modern Design</h4>
                                <p className="text-gray-400">Building solutions with modern UI's and with latest technology stacks.</p>
                            </div>

                            <div className="p-4 my-2 text-center rounded">
                                <svg className="inline h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                <h4 className="mb-2 text-lg font-semibold text-white">Fast and Optimal</h4>
                                <p className="text-gray-400">I can guarantee the best user experience with the best beanchmark results.</p>
                            </div>
                        </div>

                        <div className="col-span-6 p-4">
                            <img src="/img/web-mockup.jpg" className="w-full" alt="Site Mockup"/>
                        </div>

                        <div className="col-span-3 p-4">
                            <div className="p-4 my-2 text-center rounded">
                                <svg className="inline h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                <h4 className="mb-2 text-lg font-semibold text-white">Search Engines</h4>
                                <p className="text-gray-400">Solutions ready to be found through the most popular search engines on the Internet universe.</p>
                            </div>

                            <div className="p-4 my-2 text-center bg-gray-900 rounded">
                                <svg className="inline h-8 mb-2 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                                <h4 className="mb-2 text-lg font-semibold text-white">Professional Design</h4>
                                <p className="text-gray-400">Solutions designed and developed by a more than 6 years experience professional.</p>
                            </div>

                            <div className="p-4 my-2 text-center rounded">
                                <svg className="inline h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                                <h4 className="mb-2 text-lg font-semibold text-white">Professional Design</h4>
                                <p className="text-gray-400">Solutions designed and developed by a more than 6 years experience professional.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features;