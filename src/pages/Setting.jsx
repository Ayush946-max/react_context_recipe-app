import { useContext, useEffect } from 'react';
import { rc } from '../context/RecipeContext';

const Setting = () => {
  const { isDark, setIsDark } = useContext(rc);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);
  

  return (
    <div className="m-10 p-4 dark:text-white">
      <button
        onClick={toggleTheme}
        className="relative px-3 py-2 flex items-center justify-between gap-5 bg-zinc-900 dark:bg-zinc-300 rounded-full transition-colors duration-300"
      >
        <i className="ri-sun-fill z-10 text-white"></i>
        <i className="ri-moon-fill z-10 text-black"></i>
        {/* <div className="absolute left-0 w-10 h-10 bg-white dark:bg-white/10 rounded-full transition-transform duration-300 transform dark:translate-x-9"></div> */}
      </button>
    </div>
  );
};

export default Setting;