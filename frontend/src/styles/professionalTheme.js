export const professionalBlueTheme = {
  colors: {
    lightBlue: '#E9F1FA',
    brightBlue: '#00ABE4',
    white: '#FFFFFF',
    darkText: '#333',
    lightText: '#666'
  },

  formStyles: {
    paper: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '2px solid rgba(0, 171, 228, 0.2)',
      boxShadow: '0 20px 60px rgba(0, 171, 228, 0.15)'
    },

    textField: {
      '& .MuiOutlinedInput-root': {
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 3,
        '& fieldset': { borderColor: 'rgba(0, 171, 228, 0.3)', borderWidth: '2px' },
        '&:hover fieldset': { borderColor: '#00ABE4' },
        '&.Mui-focused fieldset': { borderColor: '#00ABE4', borderWidth: 2 }
      },
      '& .MuiInputLabel-root': { color: '#666' },
      '& .MuiOutlinedInput-input': { color: '#333' }
    },

    button: {
      background: 'linear-gradient(45deg, #00ABE4, #0099CC)',
      color: 'white',
      '&:hover': {
        background: 'linear-gradient(45deg, #0099CC, #00ABE4)',
        boxShadow: '0 8px 25px rgba(0,171,228,0.4)'
      }
    },

    title: {
      color: '#00ABE4',
      textShadow: '0 2px 4px rgba(0,171,228,0.3)'
    },

    subtitle: {
      color: '#666'
    },

    icons: {
      color: '#00ABE4'
    }
  }
};