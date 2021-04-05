import React from 'react';

const StyleContext = React.createContext({
  primary: undefined,
  secondary: undefined,
  link: undefined,
  background: undefined,
  text: undefined,
  darkTheme: {
    primary: undefined,
    secondary: undefined,
    link: undefined,
    background: undefined,
    text: undefined,
  },
  lightTheme: {
    primary: undefined,
    secondary: undefined,
    link: undefined,
    background: undefined,
    text: undefined,
  },
  currentTheme: undefined,
  themeSwitcher: () => undefined,
});

export default StyleContext;
