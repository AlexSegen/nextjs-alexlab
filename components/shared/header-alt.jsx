import Link from 'next/link'
import { useState, useEffect } from "react"

const Header = () => {

    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() =>{
        document.addEventListener('scroll', function(e) {
            setScrollPosition(window.scrollY)
        });

    }, []);


    return ( 
        <header className={` w-full transition duration-150 ${scrollPosition > 400 ? 'bg-gray-900 fixed top-0 z-20':'bg-black'}`}>
            <div className="container w-full mx-auto">
                <div className="flex items-center">
                    <div className="w-40">
                        <Link href="/">
                            <a className="block font-mono font-semibold text-white uppercase whitespace-nowrap">
                                <span className="text-green-400 ">&lt;</span>Avivas Dev<span className="text-indigo-400 ">&gt;</span>
                            </a>
                        </Link>
                    </div>
                    <div className="w-full">
                        <nav className="flex justify-end w-full">
                            <NavItem href="/">Home</NavItem>
                            <NavItem href="/career">Career</NavItem>
                            <NavItem href="/portfolio"><i className="inline-flex w-3 h-3 mr-2 bg-green-400 rounded-full opacity-75 animate-ping"></i> Portfolio</NavItem>
                            <NavItem href="#contact">Contact</NavItem>
                        </nav>
                    </div>
                </div>

            </div>
            
        </header>
     );
}

function NavItem({href, children}) {

    return (<Link href={href}>
                <a className="block px-6 py-6 font-semibold text-gray-400 hover:text-white">
                    {children}
                </a>
            </Link>)
}
 
export default Header;