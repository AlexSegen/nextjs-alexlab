import { createContext, useState } from 'react';
import { projects } from "./data";


export const ConfigContext = createContext();

const initialState =  {
    title: "Bienvenido | Alejandro Vivas - Frontend Developer",
    description: "Alejandro Vivas - Frontend Developer.",
    author: "alexsegen",
    twitter: "https://twitter.com/pixelagil",
    linkedin: "https://www.linkedin.com/in/alejandro-vivas/",
    github : "https://github.com/alexsegen"
}

const ConfigContextProvider = ({children}) => {

    const [config] = useState(initialState);

    return ( 
        <ConfigContext.Provider value={{
            ...config,
            projects
        }} >
            { children }
        </ConfigContext.Provider>
     );
}
 
export default ConfigContextProvider;