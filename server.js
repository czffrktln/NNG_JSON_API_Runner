const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, resp) => {
  resp.sendFile(__dirname + '/frontend/index.html')
})

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});