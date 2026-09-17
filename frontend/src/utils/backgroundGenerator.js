// Generate SVG background patterns
export const generateBackgroundSVG = (type = 'parking') => {
  const patterns = {
    parking: `
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="parking-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <rect width="50" height="50" fill="rgba(25, 118, 210, 0.05)"/>
            <rect x="10" y="10" width="30" height="20" fill="none" stroke="rgba(25, 118, 210, 0.2)" stroke-width="1.5" rx="3"/>
            <circle cx="25" cy="20" r="2" fill="rgba(25, 118, 210, 0.3)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#parking-pattern)"/>
      </svg>
    `,
    geometric: `
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="geometric-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="rgba(103, 126, 234, 0.05)"/>
            <circle cx="20" cy="20" r="6" fill="none" stroke="rgba(103, 126, 234, 0.2)" stroke-width="1"/>
            <polygon points="20,14 26,20 20,26 14,20" fill="rgba(103, 126, 234, 0.15)"/>
            <circle cx="20" cy="20" r="2" fill="rgba(103, 126, 234, 0.3)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geometric-pattern)"/>
      </svg>
    `,
    waves: `
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="wave-pattern" x="0" y="0" width="60" height="30" patternUnits="userSpaceOnUse">
            <rect width="60" height="30" fill="rgba(118, 75, 162, 0.05)"/>
            <path d="M0,15 Q15,8 30,15 T60,15" stroke="rgba(118, 75, 162, 0.2)" stroke-width="1.5" fill="none"/>
            <path d="M0,20 Q15,13 30,20 T60,20" stroke="rgba(118, 75, 162, 0.15)" stroke-width="1" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wave-pattern)"/>
      </svg>
    `,
    hexagon: `
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagon-pattern" x="0" y="0" width="50" height="43.3" patternUnits="userSpaceOnUse">
            <rect width="50" height="43.3" fill="rgba(0, 150, 136, 0.05)"/>
            <polygon points="25,5 40,15 40,30 25,40 10,30 10,15" fill="none" stroke="rgba(0, 150, 136, 0.2)" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagon-pattern)"/>
      </svg>
    `
  };

  return `data:image/svg+xml;base64,${btoa(patterns[type] || patterns.parking)}`;
};

export const getThemeBackgroundStyle = (themeName, page = 'default') => {
  const themeBackgrounds = {
    default: getBackgroundStyle(page),
    dark: {
      background: `linear-gradient(135deg, rgba(18, 18, 18, 0.95), rgba(30, 30, 30, 0.95))`,
      backgroundAttachment: 'fixed'
    },
    ocean: {
      background: `
        linear-gradient(135deg, rgba(2, 119, 189, 0.8), rgba(0, 172, 193, 0.8)),
        url("${generateBackgroundSVG('waves')}")
      `,
      backgroundSize: '400% 400%, 120px 60px',
      backgroundAttachment: 'fixed'
    },
    forest: {
      background: `
        linear-gradient(135deg, rgba(46, 125, 50, 0.8), rgba(102, 187, 106, 0.8)),
        url("${generateBackgroundSVG('hexagon')}")
      `,
      backgroundSize: '400% 400%, 100px 86px',
      backgroundAttachment: 'fixed'
    }
  };

  return themeBackgrounds[themeName] || themeBackgrounds.default;
};

export const getBackgroundStyle = (page = 'default') => {
  const backgrounds = {
    login: {
      background: `
        linear-gradient(135deg, rgba(25, 118, 210, 0.9), rgba(103, 126, 234, 0.9)),
        url("${generateBackgroundSVG('parking')}")
      `,
      backgroundSize: '400% 400%, 100px 100px',
      animation: 'gradientShift 15s ease infinite',
      backgroundAttachment: 'fixed'
    },
    register: {
      background: `
        linear-gradient(135deg, rgba(103, 126, 234, 0.9), rgba(118, 75, 162, 0.9)),
        url("${generateBackgroundSVG('geometric')}")
      `,
      backgroundSize: '400% 400%, 80px 80px',
      animation: 'gradientShift 15s ease infinite',
      backgroundAttachment: 'fixed'
    },
    dashboard: {
      background: '#ffffff',
      backgroundAttachment: 'fixed'
    },
    admin: {
      background: '#ffffff',
      backgroundAttachment: 'fixed'
    }
  };

  return backgrounds[page] || backgrounds.dashboard;
};

// Enhanced glassmorphism styles
export const getGlassmorphismStyle = (intensity = 'medium') => {
  const styles = {
    light: {
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    medium: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(15px)',
      border: '1px solid rgba(255, 255, 255, 0.3)'
    },
    strong: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.4)'
    }
  };

  return styles[intensity] || styles.medium;
};