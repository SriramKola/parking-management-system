export const glassmorphismFormStyles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)),
      url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, rgba(74, 144, 226, 0.1), rgba(142, 68, 173, 0.1))',
      animation: 'shimmer 3s ease-in-out infinite alternate'
    },
    '@keyframes shimmer': {
      '0%': { opacity: 0.3 },
      '100%': { opacity: 0.1 }
    }
  },

  paper: {
    p: 5,
    borderRadius: 6,
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(30px)',
    border: '2px solid rgba(255, 255, 255, 0.25)',
    boxShadow: `
      0 20px 60px 0 rgba(0, 0, 0, 0.3),
      0 8px 32px 0 rgba(31, 38, 135, 0.4),
      inset 0 2px 0 rgba(255, 255, 255, 0.6),
      inset 0 -2px 0 rgba(255, 255, 255, 0.1)
    `,
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: `
        0 25px 80px 0 rgba(0, 0, 0, 0.4),
        0 12px 40px 0 rgba(31, 38, 135, 0.5)
      `
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent)'
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
      borderRadius: 'inherit',
      zIndex: -1
    }
  },

  textField: {
    '& .MuiOutlinedInput-root': {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(15px)',
      borderRadius: 3,
      transition: 'all 0.4s ease',
      '& fieldset': { 
        borderColor: 'rgba(255, 255, 255, 0.4)', 
        borderWidth: '2px' 
      },
      '&:hover fieldset': { 
        borderColor: 'rgba(255, 255, 255, 0.6)',
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
      },
      '&.Mui-focused fieldset': { 
        borderColor: 'rgba(255, 255, 255, 0.9)', 
        borderWidth: 3,
        boxShadow: '0 0 25px rgba(255, 255, 255, 0.2)'
      },
      '&:hover': { 
        transform: 'translateY(-3px)', 
        boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
      }
    },
    '& .MuiInputLabel-root': { 
      color: 'rgba(255, 255, 255, 0.85)',
      fontWeight: 500
    },
    '& .MuiOutlinedInput-input': { 
      color: 'rgba(255, 255, 255, 0.95)',
      fontWeight: 400
    },
    '& .MuiSelect-select': { 
      color: 'rgba(255, 255, 255, 0.95)' 
    },
    '& .MuiSelect-icon': { 
      color: 'rgba(255, 255, 255, 0.7)' 
    }
  }
};