const mongoose = require('mongoose');
const router = require('express').Router();
const Subjects = mongoose.model('Subjects');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._name) {
    return res.status(422).json({
      errors: {
        _name: 'is required',
      },
    });
  }
  
  if(!body._classroom) {
    return res.status(422).json({
      errors: {
        _classroom: 'is required',
      },
    });
  }
  
  const finalSubject = new Subjects(body);
  return finalSubject.save()
    .then(() => res.json({ subject: finalSubject.toJSON() }))
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Subjects.find()
    .sort({ createdAt: 'descending' })
    .then((subjects) => res.json({ subjects: subjects.map(subject => subject.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Subjects.findById(id, (err, subject) => {
    if(err) {
      return res.sendStatus(404);
    } else if(subject) {
      req.subject = subject;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    subject: req.subject.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._name !== 'undefined') {
    req.subject._name = body._name;
  }

  if(typeof body._classroom !== 'undefined') {
    req.subject._classroom = body._classroom;
  }

  return req.subject.save()
    .then(() => res.json({ subject: req.subject.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Subjects.findByIdAndRemove(req.subject._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;