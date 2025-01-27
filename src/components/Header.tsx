import { useTheme } from '@/context/theme-provider'
import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom'
import CitySearch from './city-search';

const Header = () => {
    const {theme, setTheme} = useTheme();
    const isDark = theme === "dark";

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60'>

      <div className='container flex items-center justify-between h-16 px-4 mx-auto'>

        <Link to={"/"}>
            <img src={isDark ? "/public/logo.png" : "/public/logo2.png"}
             alt='Klimate Logo' className='h-14'/>
        </Link>

        <div className='flex items-center gap-4'>

          {/* search */}
          <CitySearch/>

        {/* theme toggle */}
        <div onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex items-center cursor-pointer transition-transform duration-500
            ${isDark ? "rotate-180" : "rotate-0"}`}>
            {isDark ? 
                (<Sun className='w-6 h-6 text-yellow-500 transition-all rotate-0'/>):
                (<Moon className='w-6 h-6 text-blue-500 transition-all rotate-0'/>)}
        </div>
        </div>

      </div>

    </header>
  )
}

export default Header
