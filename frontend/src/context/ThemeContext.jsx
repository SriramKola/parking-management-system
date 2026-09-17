import { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themes = {
  default: {
    name: 'Default Blue',
    palette: {
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
      background: { default: '#ffffff', paper: '#ffffff' }
    }
  },
  dark: {
    name: 'Dark Mode',
    palette: {
      mode: 'dark',
      primary: { main: '#90caf9' },
      secondary: { main: '#f48fb1' },
      background: { default: '#121212', paper: '#1e1e1e' }
    }
  },
  ocean: {
    name: 'Ocean Breeze',
    palette: {
      primary: { main: '#0277bd' },
      secondary: { main: '#00acc1' },
      background: { default: '#ffffff', paper: '#ffffff' }
    }
  },
  sunset: {
    name: 'Sunset Orange',
    palette: {
      primary: { main: '#ff6f00' },
      secondary: { main: '#ff8f00' },
      background: { default: '#ffffff', paper: '#ffffff' }
    }
  },
  forest: {
    name: 'Forest Green',
    palette: {
      primary: { main: '#2e7d32' },
      secondary: { main: '#66bb6a' },
      background: { default: '#ffffff', paper: '#ffffff' },
      text: { primary: '#1b5e20', secondary: '#388e3c' }
    }
  },
  purple: {
    name: 'Royal Purple',
    palette: {
      primary: { main: '#7b1fa2' },
      secondary: { main: '#ab47bc' },
      background: { default: '#ffffff', paper: '#ffffff' }
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('forest');

  const changeTheme = (themeName) => {
    // Theme switching disabled - always use forest theme
  };

  const muiTheme = createTheme({
    ...themes[currentTheme],
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            background: themes[currentTheme].palette.mode === 'dark' 
              ? 'rgba(30, 30, 30, 0.9)' 
              : '#ffffff',
            boxShadow: themes[currentTheme].palette.mode === 'dark' 
              ? '0 4px 20px rgba(0,0,0,0.3)'
              : '0 2px 10px rgba(0,0,0,0.1)',
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: '#ffffff',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
            }
          }
        }
      }
    }
  });

  const value = {
    currentTheme,
    themes: Object.keys(themes),
    changeTheme,
    themeNames: Object.values(themes).map(t => t.name)
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};