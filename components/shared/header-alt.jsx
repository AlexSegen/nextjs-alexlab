import Link from 'next/link'
import { useState, useEffect, useContext } from "react"
import { Menu } from '@headlessui/react';
import { ThemeContext } from '../../contexts/ThemeContext';

const Header = () => {

    const [scrollPosition, setScrollPosition] = useState(0);
    const { darkMode, setDarkMode, loadThemeConfig, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        document.addEventListener('scroll', function(e) {
            setScrollPosition(window.scrollY)
        });
    }, []);

    return ( 
        <header className={` w-full p-4 lg:p-0 z-40  ${scrollPosition > 400 ? 'bg-white dark:bg-gray-900 fixed top-0 fade-in-top shadow-md':'bg-white dark:bg-black relative'}`}>
            <div className="container w-full mx-auto">
                <div className="relative flex items-center justify-between w-full lg:justify-center">
                    <div className="w-40">
                        <Link href="/">
                            <a className="block font-bold text-gray-700 uppercase hover:text-gray-600 focus:text-gray-800 dark:text-white dark:hover:text-gray-300 dark:focus:text-gray-400 whitespace-nowrap">
                                <span className="text-green-400 ">&lt;</span>Avivas Dev<span className="text-indigo-400 ">&gt;</span>
                            </a>
                        </Link>
                    </div>
                    <Menu >
                        {({open}) => (
                            <>
                                <Menu.Button className={`button lg:hidden focus:bg-green-400 hover:bg-green-400 ${open ? 'bg-green-700 dark:bg-green-400':'bg-green-400 dark:bg-gray-600'} text-black flex justify-center items-center p-0 w-10 h-10`}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                                </Menu.Button>

                                <Menu.Items className="absolute z-40 w-full rounded bg-gray-50 dark:bg-gray-800 md:hidden -bottom-80 focus:outline-none top-14">
                                    <nav className="justify-end block w-full text-lg md:flex">
                                        <NavItem href="/">Home</NavItem>
                                        <NavItem href="/career">Career</NavItem>
                                        <NavItem href="/portfolio"><i className="hidden w-3 h-3 mr-2 bg-green-400 rounded-full opacity-75 md:inline-flex animate-ping"></i> Portfolio</NavItem>
                                        <NavItem href="https://toastmejs.netlify.app/">Toastme JS</NavItem>
                                        
                                        <NavItem href="/#contact">Contact</NavItem>
                                        <NavItem href="#!">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                                        </NavItem>
                                    </nav>
                                </Menu.Items>
                            </>
                        )}
                    </Menu>
                    <div className="hidden w-full md:block">
                        <nav className="justify-end block w-full md:flex">
                            <NavItem href="/">Home</NavItem>
                            <NavItem href="/career">Career</NavItem>
                            <NavItem href="/portfolio"><i className="hidden w-3 h-3 mr-2 bg-green-400 rounded-full opacity-75 md:inline-flex animate-ping"></i> Portfolio</NavItem>
                            <NavItem target="_blank" href="https://toastmejs.netlify.app/">Toastme JS</NavItem>
                            <NavItem href="/#contact">Contact</NavItem>
                            <NavItem onClick={toggleTheme} href="#!">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                            </NavItem>
                        </nav>
                    </div>
                </div>

            </div>
            
        </header>
     );
}

function NavItem({href, children, ...props}) {

    return (<Link href={href} {...props}>
        <a  className="block px-4 py-4 font-semibold text-gray-500 md:py-6 hover:text-gray-400 focus:text-gray-600 darK:text-gray-400 darK:hover:text-white" {...props} >
            {children}
        </a>
    </Link>)
}
 
export default Header;