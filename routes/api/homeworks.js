const mongoose = require('mongoose');
const router = require('express').Router();
const Homeworks = mongoose.model('Homeworks');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._due_date) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }

  if(!body._course) {
    return res.status(422).json({
      errors: {
        body: 'is required',
      },
    });
  }

  if(!body._student) {
    return res.status(422).json({
      errors: {
        author: 'is required',
      },
    });
  }

  const finalHomework = new Homeworks(body);
  return finalHomework.save()
    .then(() => res.json({ homework: finalHomework.toJSON() }))
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Homeworks.find()
    .sort({ createdAt: 'descending' })
    .then((homeworks) => res.json({ homeworks: homeworks.map(homework => homework.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Homeworks.findById(id, (err, homework) => {
    if(err) {
      return res.sendStatus(404);
    } else if(homework) {
      req.homework = homework;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    homework: req.homework.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._due_date !== 'undefined') {
    req.homework._due_date = body._due_date;
  }

  if(typeof body._course !== 'undefined') {
    req.homework._course = body._course;
  }

  if(typeof body._gender !== 'undefined') {
    req.homework._student = body._student;
  }

  return req.homework.save()
    .then(() => res.json({ homework: req.homework.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Homeworks.findByIdAndRemove(req.homework._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;