import express from 'express';
import image from './apis/imageService.js';
import user from './apis/userService.js';
import math from './apis/mathService.js';
import { log, logTypes } from './logger.js';

const app = express();

app.use(express.json());
app.use(express.static('frontend'))

app.use('/', (req, res, next) => {
  log(`${req.method} ${req.url}`, logTypes.REQUEST);

  let input;

  try {
    input = JSON.parse(req.body.input);
  } catch (err) {
    log(`Invalid JSON input: ${req.body.input}`, logTypes.ERROR);
    return res.status(400).json({ error: 'Invalid JSON format.'});
  }

  if (!Array.isArray(input)) {
    log('Invalid input. Expected an array.', logTypes.ERROR)
    return res.status(400).json({ error: 'Invalid input. Expected an array.' });
  }

  for (let obj of input) {
    if (
      typeof obj !== 'object' || 
      !obj.method || 
      !obj.params || 
      typeof obj.params !== 'object'
    ) {
      log('Invalid input type.', logTypes.ERROR)
      return res.status(400).json({ error: 'Invalid input type.' });
    }
  }
  
  next()
})

app.use('/', image);
app.use('/', user);
app.use('/', math);

app.use((req, res) => {
  res.status(404).send('Not found')
})

export default app;