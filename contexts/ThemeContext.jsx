import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = ({children}) => {

    const [darkMode, setDarkMode] = useState('dark');

    const loadThemeConfig = () => {
        if ((localStorage.theme === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark')
            setDarkMode(true);
        } else {
            document.body.classList.remove('dark')
            setDarkMode(false);
        }
    }

    const toggleTheme = () => {
        localStorage.setItem('theme', darkMode ? 'light':'dark');
        setDarkMode(t => !t);
    }


    useEffect(() => {
        loadThemeConfig();
    }, [darkMode])

    return ( 
        <ThemeContext.Provider value={{
            darkMode, setDarkMode, loadThemeConfig, toggleTheme
        }} >
            { children }
        </ThemeContext.Provider>
     );
}
 
export default ThemeContextProvider;