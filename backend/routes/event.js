import express from 'express';
import Event from '../models/reminder.model.js';

const router = express.Router();

/* GET events listing. */
router.get('/', function(req, res) {
  Event.find().then(events => res.json(events)).catch(err => res.status(400).json('Error: ' + err))
});

/* POST events listing. */
router.post('/add', function(req, res) {
  const description = req.body.description;
  const start = Date.parse(req.body.start);
  const end = Date.parse(req.body.end);
  const all_day = Boolean(req.body.all_day);
  const remind = Number(req.body.remind);
  // creating a new event and adding him to the database
  const new_user = new Event({
    description,
    start,
    end,
    all_day,
    remind
  });
  new_user.save().then(() => res.json('Event added')).catch(err => res.status(400).json('Error: ' + err))
});

/* GET events listing. */
router.get('/:id', function(req, res) {
  Event.findById(req.params.id).then(events => res.json(events)).catch(err => res.status(400).json('Error: ' + err))
});

/* DELETE events listing. */
router.delete('/:id', function(req, res) {
  Event.findByIdAndDelete(req.params.id).then(() => res.json('Event deleted')).catch(err => res.status(400).json('Error: ' + err))
});

/* UPDATE events listing. */
router.put('/update/:id', function(req, res) {
  Event.findById(req.params.id).then(event => {
    event.description = req.body.description;
    event.start = Date.parse(req.body.start);
    event.end = Date.parse(req.body.end);
    event.all_day = Boolean(req.body.all_day);
    event.remind = Number(req.body.remind);

    event.save().then(() => res.json('Event updated')).catch(err => res.status(400).json('Error: ' + err))
  })
});

export default router;