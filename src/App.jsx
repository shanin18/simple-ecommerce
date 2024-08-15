import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyle, lightTheme } from "./styles/themes";
import ProductListing from "./pages/ProductListing";

import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import { FiMoon, FiSun } from "react-icons/fi";

AOS.init({
  duration: 1000, // Duration of animation in milliseconds
});

const App = () => {
  // Initialize darkMode state from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Update localStorage whenever darkMode changes
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prevMode) => !prevMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-between items-center gap-4 p-4">
          <h1 className="text-2xl font-bold mb-4">Our Products</h1>
          <button
            onClick={toggleTheme}
            className="mb-4 px-4 py-2 rounded bg-blue-500 text-white"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>

        <ProductListing />
        <Toaster />
      </div>
    </ThemeProvider>
  );
};

export default App;
