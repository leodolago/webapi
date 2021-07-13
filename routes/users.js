const express = require('express');
const router = express.Router();
const db = require('../model/db');
const userSchema = require('../model/userSchema');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(db.findUsers());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.json(db.findUser(id));
})

function validationMiddleware(req, res, next){
  if(["POST", "PUT"].indexOf(req.method) !== -1){
    if(!req.body.nome || !req.body.idade)
    return res.status(422).json({error: "nome and idade are required!"})
  }
  const { error } = userSchema.validate(req.body);
  if(error)
      return res.status(422).json({error: error.details});
      else
      next();
}

router.post('/', validationMiddleware, (req, res) => {
    const user = db.insertUser(req.body);
    res.status(201).json(user);
})

router.put('/:id', validationMiddleware,
(req, res) => {
  const id = req.params.id;
  const user = db.updateUser(id, req.body, true);
  res.status(200).json(user);
})

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const user = db.updateUser(id, req.body);
  res.status(200).json(user);
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.deleteUser(id);
  res.status(200);
})

module.exports = router;
