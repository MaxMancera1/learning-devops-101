const express = require('express');
const app = express();
const PORT = 80;

app.get('/', (req, res) => {
  res.send("Hello, I'm version #1");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
