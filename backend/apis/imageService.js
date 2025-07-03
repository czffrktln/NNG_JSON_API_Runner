import express from 'express';
import { log, logTypes } from '../logger.js'
 
const router = express.Router();

const usersWithImage = [
  { id: 1, name: "Olive", image: "Olive.png"},
  { id: 2, name: "Oscar", image: "Oscar.png"},
  { id: 3, name: "Ocean", image: "Ocean.png"}
]

router.post('/image', (req, res) => {
  log(`Processing request with body: ${req.body.input}`, logTypes.INFO)
  const input =  JSON.parse(req.body.input);

  const getImageInput = input.find(obj => obj.method === "getImageByName");
  if (!getImageInput) {
    log('Invalid method', logTypes.ERROR);
    return res.status(404).json({ error: 'Invalid method.' });
  }
  
  const { params } = getImageInput;
  if (!('name' in params) || typeof params.name !== 'string') {
    log('Missing or invalid parameter.', logTypes.ERROR);
    return res.status(400).json({ error: 'Missing or invalid parameter.' }); 
  }

  const userWithImage = usersWithImage.find(user => user.name === params.name)
  if (!userWithImage) {
    log('User with image not found', logTypes.ERROR)
    return res.status(404).json({ error: 'User with image not found'})
  }

  log(JSON.stringify(userWithImage), logTypes.RESPONSE)
  res.status(200).json({result: userWithImage})
});

export default router;