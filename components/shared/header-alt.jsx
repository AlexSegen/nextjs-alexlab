import Link from 'next/link'
import { useState, useEffect } from "react"
import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './language-switcher'

const Header = () => {

    const [scrollPosition, setScrollPosition] = useState(0);
    const { t } = useTranslation('common');

    useEffect(() =>{
        document.addEventListener('scroll', function(e) {
            setScrollPosition(window.scrollY)
        });

    }, []);


    return (
        <header className={` w-full p-4 lg:p-0 z-40  ${scrollPosition > 400 ? 'bg-gray-900 fixed top-0 fade-in-top':'bg-black relative'}`}>
            <div className="container w-full mx-auto">
                <div className="relative flex items-center justify-between w-full lg:justify-center">
                    <div className="w-40">
                        <Link href="/" className="block font-bold text-white uppercase whitespace-nowrap">
                            <span className="text-green-400 ">&lt;</span>Avivas Dev<span className="text-indigo-400 ">&gt;</span>
                        </Link>
                    </div>
                    <Menu>
                        <MenuButton className="button lg:hidden focus:bg-green-400 hover:bg-green-400 bg-gray-600 data-[open]:bg-green-400 text-black flex justify-center items-center p-0 w-10 h-10">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        </MenuButton>

                        <MenuItems className="absolute z-40 w-full bg-gray-800 rounded md:hidden -bottom-80 focus:outline-none">
                            <nav className="justify-end block w-full md:flex">
                                <NavItem href="/">{t('nav.home')}</NavItem>
                                <NavItem href="/career">{t('nav.career')}</NavItem>
                                <NavItem href="/portfolio"><i className="hidden w-3 h-3 mr-2 bg-green-400 rounded-full opacity-75 md:inline-flex animate-ping"></i> {t('nav.portfolio')}</NavItem>
                                <NavItem href="/#contact">{t('nav.contact')}</NavItem>
                                <LanguageSwitcher />
                            </nav>
                        </MenuItems>
                    </Menu>
                    <div className="hidden w-full md:block">
                        <nav className="justify-end block w-full md:flex">
                            <NavItem href="/">{t('nav.home')}</NavItem>
                            <NavItem href="/career">{t('nav.career')}</NavItem>
                            <NavItem href="/portfolio"><i className="hidden w-3 h-3 mr-2 bg-green-400 rounded-full opacity-75 md:inline-flex animate-ping"></i> {t('nav.portfolio')}</NavItem>
                            <NavItem href="/#contact">{t('nav.contact')}</NavItem>
                            <LanguageSwitcher />
                        </nav>
                    </div>
                </div>

            </div>
            
        </header>
     );
}

function NavItem({href, children}) {

    return (<Link href={href} className="block px-6 py-6 font-semibold text-gray-400 hover:text-white">
                {children}
            </Link>)
}
 
export default Header;