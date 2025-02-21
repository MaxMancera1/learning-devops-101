const path = require('path');

module.exports = {
    mode: 'development', // o 'production' dependiendo de lo que necesites
    entry: './src/index.js', // Asegúrate de que este archivo exista
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };