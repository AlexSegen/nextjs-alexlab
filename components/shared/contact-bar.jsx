import React from 'react';
import Link from 'next/link';

const ContactBar = props => {
    const { btnText, contentText, contentSubText } = props;

    return (
        <div className={`dark:bg-black bg-gray-50  relative px-4 md:px-10 py-20 overflow-hidden `}>
            <div className="items-center justify-center block md:flex">
                <div className="relative z-20 w-full p-10 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-700 md:text-4xl dark:text-white">{ contentText }</h2>
                    {
                        contentSubText ? <p className="text-xl text-gray-500 md:text-3xl dark:text-white">{ contentSubText }</p> : null
                    }
                </div>
                <div className="z-20 text-center md:w-1/2">
                    <Link href="#contact">
                        <a className="px-12 py-3 text-xl shadow-md md:text-3xl button is-primary whitespace-nowrap">{ btnText }</a>
                    </Link>
                </div>
            </div>
            <img className="absolute top-0 object-fill w-full opacity-5 dark:opacity-10" src="/img/collage.jpg" alt=""/>
        </div>
    )
}

export default ContactBar;