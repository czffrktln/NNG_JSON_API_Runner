import express from 'express';

const router = express.Router();

const usersWithImage = [
  { id: 1, name: "Olive", image: "Olive.png"},
  { id: 2, name: "Oscar", image: "Oscar.png"},
  { id: 3, name: "Ocean", image: "Ocean.png"}
]

router.post('/image', (req, res) => {
  const input =  JSON.parse(req.body.input);

  const getImageInput = input.find(obj => obj.method === "getImageByName");
  if (!getImageInput) return res.status(404).json({ error: 'Invalid method.' });
  
  const getImageParams = getImageInput.params;
  if (!('name' in getImageParams) || typeof getImageParams.name !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid parameter.' }); 
  }

  const name = getImageParams.name;
  const userWithImage = usersWithImage.find(user => user.name === name)
  if (!userWithImage) return res.status(404).json({ error: 'User with image not found'})
  
  res.status(200).json({result: userWithImage})

});

export default router;