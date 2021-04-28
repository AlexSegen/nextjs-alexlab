import ThemeContextProvider from "../contexts/ThemeContext";
import ConfigContextProvider from "../contexts/ConfigContext";

import 'simple-line-icons/css/simple-line-icons.css';
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import '../styles/animations.css'

function MyApp({ Component, pageProps }) {
  return (
    <ConfigContextProvider>
        <ThemeContextProvider>
          <Component {...pageProps} />
        </ThemeContextProvider>
    </ConfigContextProvider>
  )
}

export default MyApp
