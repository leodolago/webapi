const express = require('express');
const router = express.Router();
const db = require('../models/userModel');
const validationMiddleware = require('../middlewares/validationMiddleware');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(db.findUsers());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.json(db.findUser(id));
})

router.post('/', validationMiddleware, (req, res) => {
    const user = db.insertUser(req.body);
    res.status(201).json(user);
})

router.put('/:id', validationMiddleware, (req, res) => {
  const id = req.params.id;
  const user = db.updateUser(id, req.body, true);
  res.status(200).json(user);
})

router.patch('/:id', validationMiddleware, (req, res) => {
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
