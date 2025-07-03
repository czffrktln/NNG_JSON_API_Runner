import express from 'express';
import { log, logTypes } from '../logger.js';

const router = express.Router();

const users = [
  {id: 1, name: "Olive", age: 16},
  {id: 2, name: "Oscar", age: 45},
  {id: 3, name: "Ocean", age: 34},
]

router.post('/user', (req, res) => {
  log(`Processing request with body: ${req.body.input}`, logTypes.INFO)
  const input =  JSON.parse(req.body.input);
  const userProfileInput = input.find(obj => obj.method === "getUserProfile");
  if (!userProfileInput) {
    log('Invalid method', logTypes.ERROR)
    return res.status(404).json({ error: 'Invalid method.' });
  };
  
  const { params } = userProfileInput;
  if (!('id' in params) || typeof params.id !== 'number') {
    log('Missing or invalid parameter.', logTypes.ERROR)
    return res.status(400).json({ error: 'Missing or invalid parameter.' }); 
  }
  
  const userProfile = users.find(user => user.id === params.id)
  if (!userProfile) {
    log('User not found', logTypes.ERROR)
    return res.status(404).json({ error: 'User not found'})
  }

  log(JSON.stringify(userProfile), logTypes.RESPONSE)
  res.status(200).json({result: userProfile})
});

export default router;