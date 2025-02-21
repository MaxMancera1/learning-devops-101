import { Linter } from 'eslint';

const config: Linter.Config = {
  languageOptions: {
    globals: {
      someGlobal: 'readonly',
    },
  },
  rules: {
    // Aquí añades reglas si las tienes
  },
};

export default config;
