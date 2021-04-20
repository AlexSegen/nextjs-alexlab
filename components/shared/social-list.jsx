import { useContext } from 'react';
import { ConfigContext } from '../../contexts/ConfigContext';

const SocialItem = ({ url, label, children }) => {
    return (
        <li className="items-center block">
            <a className="inline-flex items-center text-white hover:text-green-500" href={url} target="_blank" rel="noopener noreferrer">
                {children} {label}
            </a>
        </li>
    )
}

const SocialList = () => {

    const context = useContext(ConfigContext);

    return (
        <ul className="">
            <SocialItem url={context.twitter} label="/pixelagil">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  className="w-8 mr-2 text-gray-300" fill="currentColor">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path stroke="#1F2937" d="M15.3 5.55a2.9 2.9 0 0 0-2.9 2.847l-.028 1.575a.6.6 0 0 1-.68.583l-1.561-.212c-2.054-.28-4.022-1.226-5.91-2.799-.598 3.31.57 5.603 3.383 7.372l1.747 1.098a.6.6 0 0 1 .034.993L7.793 18.17c.947.059 1.846.017 2.592-.131 4.718-.942 7.855-4.492 7.855-10.348 0-.478-1.012-2.141-2.94-2.141zm-4.9 2.81a4.9 4.9 0 0 1 8.385-3.355c.711-.005 1.316.175 2.669-.645-.335 1.64-.5 2.352-1.214 3.331 0 7.642-4.697 11.358-9.463 12.309-3.268.652-8.02-.419-9.382-1.841.694-.054 3.514-.357 5.144-1.55C5.16 15.7-.329 12.47 3.278 3.786c1.693 1.977 3.41 3.323 5.15 4.037 1.158.475 1.442.465 1.973.538z"/>
                </svg>
            </SocialItem>
            <SocialItem url={context.github} label="/alexsegen">
                <svg  xmlns="http://www.w3.org/2000/svg" fill="current" viewBox="0 0 24 24" className="w-8 mr-2 text-gray-300" fill="currentColor">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path stroke="#1F2937" d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"/>
                </svg>
            </SocialItem>
            <SocialItem url={context.linkedin} label="/alejandro-vivas">
                <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  className="w-8 mr-2 text-gray-300" fill="currentColor">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path stroke="#1F2937" d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"/>
                </svg>
            </SocialItem>
        </ul>
    )

}

export default SocialList;
