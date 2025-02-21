import { Linter } from 'eslint';

const config = {
  languageOptions: {
    globals: {
      someGlobal: 'readonly',
    },
  },
  rules: {
    // Aquí puedes añadir reglas de ESLint si las tienes
  },
};

export default config;
