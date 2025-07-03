import express from 'express';

const router = express.Router();

router.post('/image', (req, res) => {
  console.log("reqbody image",  JSON.parse(req.body.input));
  

});

export default router;