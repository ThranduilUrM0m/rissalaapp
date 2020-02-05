const mongoose = require('mongoose');
const router = require('express').Router();
const Classrooms = mongoose.model('Classrooms');

router.post('/', (req, res, next) => {
  const { body } = req;
  if(!body._code) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }
  if(!body._name) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }
  if(!body._grade) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }
  if(!body._section) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }
  if(!body._school) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }
  if(!body._teacher) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }

  const finalClassroom = new Classrooms(body);
  return finalClassroom.save()
    .then(() => res.json({ classroom: finalClassroom.toJSON() }))
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Classrooms.find()
    .sort({ createdAt: 'descending' })
    .then((classrooms) => res.json({ classrooms: classrooms.map(classroom => classroom.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Classrooms.findById(id, (err, classroom) => {
    if(err) {
      return res.sendStatus(404);
    } else if(classroom) {
      req.classroom = classroom;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    classroom: req.classroom.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._code !== 'undefined') {
    req.classroom._code = body._code;
  }

  if(typeof body._name !== 'undefined') {
    req.classroom._name = body._name;
  }

  if(typeof body._year !== 'undefined') {
    req.classroom._year = body._year;
  }

  if(typeof body._section !== 'undefined') {
    req.classroom._section = body._section;
  }

  if(typeof body._school !== 'undefined') {
    req.classroom._school = body._school;
  }

  if(typeof body._teacher !== 'undefined') {
    req.classroom._teacher = body._teacher;
  }

  if(typeof body._subjects !== 'undefined') {
    req.classroom._subjects = body._subjects;
  }

  if(typeof body._students !== 'undefined') {
    req.classroom._students = body._students;
  }

  return req.classroom.save()
    .then(() => res.json({ classroom: req.classroom.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Classrooms.findByIdAndRemove(req.classroom._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;