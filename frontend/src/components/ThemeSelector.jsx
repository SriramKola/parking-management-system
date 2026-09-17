import { FormControl, InputLabel, Select, MenuItem, Box, Chip } from '@mui/material';
import { Palette } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

const ThemeSelector = ({ sx = {} }) => {
  const { currentTheme, themes, changeTheme, themeNames } = useTheme();

  return (
    <Box sx={{ minWidth: 120, ...sx }}>
      <FormControl fullWidth size="small">
        <InputLabel id="theme-select-label">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Palette fontSize="small" />
            Theme
          </Box>
        </InputLabel>
        <Select
          labelId="theme-select-label"
          value={currentTheme}
          onChange={(e) => changeTheme(e.target.value)}
          label="Theme"
        >
          {themes.map((theme, index) => (
            <MenuItem key={theme} value={theme}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip 
                  size="small" 
                  label={themeNames[index]} 
                  variant="outlined"
                />
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ThemeSelector;