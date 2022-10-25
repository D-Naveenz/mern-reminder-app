import express from 'express';
import User from '../models/user.model.js';

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  User.find().then(users => res.json(users)).catch(err => res.status(400).json('Error: ' + err))
});

/* POST users listing. */
router.post('/add', function(req, res) {
  const username = req.body.username;
  console.log(username);
  // creating a new user and adding him to the database
  const new_user = new User({username});
  new_user.save().then(() => res.json(`User: ${username} added`)).catch(err => res.status(400).json('Error: ' + err))
});

export default router;
