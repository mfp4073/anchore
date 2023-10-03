import { THEMES } from '../constants';
import { lightShadows, darkShadows } from './shadows';

const FONTFAMILY = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"';
const baseOptions = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        fallback: {
          height: '75%',
          width: '75%'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        },
        outlinedPrimary: {
          transition: 'all 0.25s linear',
          backgroundColor: 'primary',
          opacity: 0.50,
          border: '1px solid white',
          color: 'white',
          '&:hover': {
            border: '1px solid white',
            opacity: 0.90,
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          marginTop: '0.5rem',
          marginRight: '0.3rem',
        }
      }
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6'
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: 'hidden'
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          marginRight: '16px'
        }
      }
    }
  },
  typography: {
    button: {
      fontWeight: 600
    },
    fontFamily: FONTFAMILY,
    h1: {
      fontWeight: 600,
      fontSize: '3.5rem'
    },
    h2: {
      fontWeight: 600,
      fontSize: '3rem'
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.25rem'
    },
    h4: {
      fontWeight: 600,
      fontSize: '2rem'
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem'
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem'
    },
    column_label: {
      fontWeight: 600,
      fontSize: '.9rem'
    },
    subtext: {
      fontWeight: 500,
      fontSize: '.9rem',
      fontFamily: FONTFAMILY
    },
    overline: {
      fontWeight: 600
    }
  },
  navigation: {
    icon_primary: "#6b778c"
  }
};

const themesOptions = {
  [THEMES.LIGHT]: {
    components: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            '&::placeholder': {
              opacity: 0.86,
              color: '#42526e'
            }
          }
        }
      }
    },
    palette: {
      action: {
        active: '#6b778c'
      },
      link: {
        active_blue: '#4586f7'
      },
      background: {
        default: '#f4f5f7',
        paper: '#ffffff',
      },
      error: {
        contrastText: '#ffffff',
        main: '#f44336',
        mainLighter: 'rgba(244, 67, 54, 0.08)'
      },
      success: {
        contrastText: '#ffffff',
        main: '#4caf50'
      },
      warning: {
        contrastText: '#ffffff',
        main: '#ff9800',
        mainLighter: '#ffebcc'
      },
      mode: 'light',
      primary: {
        contrastText: '#ffffff',
        main: '#03324c',
        brand_primary: "#03324c",
        brand_secondary: "orange",
        transition: 'all 2.25s linear',
        button_fill: '#ff0000',
        button_border: '#ff0000'

      },
      text: {
        primary: '#172b4d',
        secondary: '#6b778c',
        mid_grey: "#A5A6A6",
      }
    },
    shadows: lightShadows
  },
  [THEMES.DARK]: {
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: '1px solid rgba(145, 158, 171, 0.24)'
          }
        }
      }
    },
    palette: {
      background: {
        default: '#171c24',
        paper: '#222b36'
      },
      divider: 'rgba(145, 158, 171, 0.24)',
      error: {
        contrastText: '#ffffff',
        main: '#f44336'
      },
      mode: 'dark',
      primary: {
        contrastText: '#ffffff',
        main: '#688eff'
      },
      success: {
        contrastText: '#ffffff',
        main: '#4caf50'
      },
      text: {
        primary: '#ffffff',
        secondary: '#919eab'
      },
      warning: {
        contrastText: '#ffffff',
        main: '#ff9800'
      }
    },
    shadows: darkShadows
  },
  [THEMES.BCBS]: {
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: '1px solid rgba(145, 158, 171, 0.24)'
          }
        }
      }
    },
    palette: {
      action: {
        active: '#6b778c'
      },
      background: {
        default: '#ffffff',
        paper: '#f4f5f7'
      },
      error: {
        contrastText: '#ffffff',
        main: '#f44336'
      },
      mode: 'light',
      primary: {
        contrastText: '#ffffff',
        main: '#0072a7'
      },
      success: {
        contrastText: '#ffffff',
        main: '#4caf50'
      },
      text: {
        primary: '#172b4d',
        secondary: 'red'
      },
      warning: {
        contrastText: '#ffffff',
        main: '#ff9800'
      }
    },
    shadows: lightShadows
  }
};
