import React from 'react';
import Link from 'next/link';

const ContactBar = props => {
    const { btnText, contentText, contentSubText } = props;

    return (
        <div className={`bg-black text-white relative px-4 md:px-10 py-20 overflow-hidden `}>
            <div className="items-center justify-center block md:flex">
                <div className="relative z-20 w-full p-10 text-center">
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">{ contentText }</h2>
                    {
                        contentSubText ? <p className="text-xl md:text-3xl">{ contentSubText }</p> : null
                    }
                </div>
                <div className="z-20 text-center md:w-1/2">
                    <Link href="#contact">
                        <a className="px-12 py-3 text-xl md:text-3xl button is-primary whitespace-nowrap">{ btnText }</a>
                    </Link>
                </div>
            </div>
            <img className="absolute top-0 object-fill w-full opacity-10" src="/img/collage.jpg" alt=""/>
        </div>
    )
}

export default ContactBar;