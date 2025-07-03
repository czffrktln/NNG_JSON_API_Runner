import express from 'express';
const router = express.Router();

router.post('/user', (req, res) => {
  console.log("reqbody user", JSON.parse(req.body.input));
  const input =  JSON.parse(req.body.input);
  

});

export default router;