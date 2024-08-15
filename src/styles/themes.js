import { createGlobalStyle } from "styled-components";

// Define your light and dark themes
export const lightTheme = {
  background: "#ffffff",
  text: "#000000",
  border: "#cccccc",
};

export const darkTheme = {
  background: "#333333",
  text: "#ffffff",
  border: "#444444",
};

// Create global styles that apply theme variables
export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  .border {
    border-color: ${(props) => props.theme.border};
  }
`;
