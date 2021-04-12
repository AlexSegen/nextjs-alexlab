const Header = () => {
    return ( 
        <header className="bg-gray-900">
            <div className="flex justify-start items-center w-full px-40 mx-auto">
                <div className="w-20">
                    <a href="#" className="block w-full p-4">
                        <img src="https://alexlab.vercel.app/img/logo-color.png" alt=""/>
                    </a>
                </div>
                <nav className="flex w-full items-center justify-end">
                    <a className="text-white block px-4 py-2  hover:text-indigo-400 focus:outline-none" href="#">Home</a>
                    <a className="text-white block px-4 py-2  hover:text-indigo-400 focus:outline-none" href="#">About</a>
                    <a className="text-white block px-4 py-2  hover:text-indigo-400 focus:outline-none" href="#">Porfolio</a>
                    <a className="text-white block px-4 py-2  hover:text-indigo-400 focus:outline-none" href="#">Contact</a>
                </nav>
            </div>
        </header>
     );
}
 
export default Header;