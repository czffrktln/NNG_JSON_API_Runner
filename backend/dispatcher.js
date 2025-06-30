import express from 'express';

const app = express();

app.use('/', (req, res, next) => {
  console.log("middleware triggered");
  next()
})

app.get('/', (req, resp) => {
  resp.sendFile('index.html', {root: 'frontend'})
})

app.use((req, res) => {
  res.status(404).send('Not found')
})

export default app;