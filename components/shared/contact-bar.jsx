import React from 'react';
import Link from 'next/link';

const ContactBar = props => {
    const { btnText, contentText, contentSubText } = props;

    return (
        <div className={`bg-black text-white relative  px-10 py-20 overflow-hidden `}>
            <div className="flex items-center justify-center">
                <div className="relative z-20 w-full p-10 text-center">
                    <h2 className="mb-4 text-4xl font-bold">{ contentText }</h2>
                    {
                        contentSubText ? <p className="text-3xl">{ contentSubText }</p> : null
                    }
                </div>
                <div className="z-20 w-1/2">
                    <Link href="#contact">
                        <a className="px-12 py-3 text-3xl button is-primary whitespace-nowrap">{ btnText }</a>
                    </Link>
                </div>
            </div>
            <img className="absolute top-0 w-full opacity-10" src="/img/collage.jpg" alt=""/>
        </div>
    )
}

export default ContactBar;