// eslint.config.js
module.exports = {
    root: true, // Para asegurarse de que ESLint no busque configuraciones en directorios superiores
    env: {
      browser: true,  // Define que el código será ejecutado en un entorno de navegador
      node: true,     // Define que el código será ejecutado en un entorno de Node.js
    },
    extends: [
      'eslint:recommended',  // Extiende la configuración recomendada de ESLint
      'plugin:react/recommended', // Extiende la configuración recomendada para React (si usas React)
    ],
    parserOptions: {
      ecmaVersion: 2021, // Permite el uso de la versión más reciente de ECMAScript
      sourceType: 'module', // Para usar módulos de ES6
    },
    rules: {
      // Aquí puedes agregar reglas personalizadas si lo deseas
    },
  };
  