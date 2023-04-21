import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: "darkTheme",
    themes: {
      lightTheme: {
        dark: false,
        colors: {
          primary: "#ad1c3d",
          background: "#c0c0b5"
        },
      },
      darkTheme: {
        dark: true,
        variations: {
          colors: ['primary', 'secondary'],
          lighten: 3,
          darken: 3,
        },
        colors: {
          primary: "#1E1E20",
          background: "#1E1E20",
          'background-soft': "#161618",
          'background-alt': "#252529",
          secondary: "#9C92A3",
          'text-primary': "#FFFFF6",
          'text-secondary': "#f3f3f9",
          'text-muted': "#a2a2a9",
          success: '#0C7C59',
          'blue-primary': '#279AF1',
          'blue-secondary': '#3F7CAC',
          accent: '#646cff',
          'accent-light': '#9499ff',
          'red-primary': '#B3001B',
          'red-secondary': '#A62639'
        },
      },
    },
  },
});
