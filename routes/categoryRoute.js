import express from "express";

const categoryRouter = express.Router();

categoryRouter.post('/add', (req,res) => {
  
  console.log(req.body)

})

export default categoryRouter;