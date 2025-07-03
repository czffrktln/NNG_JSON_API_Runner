import express from 'express';

const router = express.Router();

const users = [
  {id: 1, name: "Olive", age: 16},
  {id: 2, name: "Oscar", age: 45},
  {id: 3, name: "Ocean", age: 34},
]

router.post('/user', (req, res) => {
  const input =  JSON.parse(req.body.input);
  const userInput = input.find(obj => obj.method === "getUserProfile");
  const userParams = userInput.params;
  
  if (!userInput) return res.status(404).json({ error: 'Invalid method.' });
  if (!('id' in userParams) || typeof userParams.id !== 'number') {
    return res.status(400).json({ error: 'Missing or invalid parameter.' }); 
  }
  const id = userParams.id;
  const userProfile = users.find(user => user.id === id)
  if (!userProfile) return res.status(404).json({ error: 'User not found'})
  
  res.status(200).json({result: userProfile})

});

export default router;