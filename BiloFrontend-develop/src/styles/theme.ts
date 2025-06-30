import { extendTheme } from '@chakra-ui/react';

export const customTheme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Montserrat, sans-serif',
  },
  styles: {
    global: {
      html: {
        fontSize: '62.5%', // 1rem = 10px
      },
      a: {
        textDecoration: 'none',
        color: 'inherit',
      },
      ul: {
        listStyleType: 'none',
      },
      ol: {
        listStyleType: 'none',
      },
      img: {
        width: '100%',
      },
    },
  },
  colors: {
    blue: {
      50: '#e5e5f5',
      100: '#b3b3e6',
      200: '#8080d6',
      300: '#4d4dc7',
      400: '#0E0E55', // Main
      500: '#0c0c4d',
      600: '#0a0a44',
      700: '#08083b',
      800: '#060633',
      900: '#04042a',
    },
    lightBlue: {
      50: '#ededfb',
      100: '#d1d1f6',
      200: '#b4b4f2',
      300: '#9898ed',
      400: '#4747D4', // Main
      500: '#3f3fbf',
      600: '#3737aa',
      700: '#2f2f95',
      800: '#272780',
      900: '#1f1f6b',
    },
    orange: {
      50: '#ffece5',
      100: '#ffd0bf',
      200: '#ffb399',
      300: '#ff9773',
      400: '#FF8559', // Main
      500: '#e6734f',
      600: '#cc6246',
      700: '#b3513c',
      800: '#993f32',
      900: '#802e29',
    },
    gray: {
      50: '#f9f9f9',
      100: '#f1f1f1',
      200: '#e0e0e0',
      300: '#cfcfcf',
      400: '#bfbfbf',
      500: '#a0a0a0',
      600: '#808080',
      700: '#606060',
      800: '#404040',
      900: '#202020',
    },
    dark: {
      50: '#d4d4d8',
      100: '#a1a1aa',
      200: '#71717a',
      300: '#52525b',
      400: '#3f3f46',
      500: '#2e2e34',
      600: '#232329',
      700: '#1c1c1f',
      800: '#18181B', // Main
      900: '#0f0f12',
    },
    black: {
      400: '#000000', // Main
    },
    
  },

  components: {
    Input: {
      baseStyle: {
        field: {
          fontSize: '2xl',
          borderRadius: '1rem',
          py: '1.75rem',
          borderColor: 'blue.400',
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          fontSize: '2xl',
          borderRadius: '1rem',
          borderColor: 'blue.400',
        },
      },
    },
    Tooltip: {
      baseStyle: {
        bg: 'dark.600',
        fontSize: 'xl',
      }
    }
  },
});
