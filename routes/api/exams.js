const mongoose = require('mongoose');
const router = require('express').Router();
const Exams = mongoose.model('Exams');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._date) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }

  if(!body._type) {
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

  const finalExam = new Exams(body);
  return finalExam.save()
    .then(() => res.json({ exam: finalExam.toJSON() }))
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Exams.find()
    .sort({ createdAt: 'descending' })
    .then((exams) => res.json({ exams: exams.map(exam => exam.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Exams.findById(id, (err, exam) => {
    if(err) {
      return res.sendStatus(404);
    } else if(exam) {
      req.exam = exam;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    exam: req.exam.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._date !== 'undefined') {
    req.exam._date = body._date;
  }

  if(typeof body._type !== 'undefined') {
    req.exam._type = body._type;
  }

  if(typeof body._course !== 'undefined') {
    req.exam._course = body._course;
  }

  if(typeof body._gender !== 'undefined') {
    req.exam._student = body._student;
  }

  return req.exam.save()
    .then(() => res.json({ exam: req.exam.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Exams.findByIdAndRemove(req.exam._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;