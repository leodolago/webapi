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

router.post('/', (req, res) => {
    const { error } = userSchema.validate(req.body);
    if(error)
        return res.status(422).json({error: error.details});

    const user = db.insertUser(req.body);
    res.status(201).json(user);
})

router.put('/:id', (req, res) => {
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
