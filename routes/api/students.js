const mongoose = require('mongoose');
const router = require('express').Router();
const Students = mongoose.model('Students');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._first_name) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }

  if(!body._last_name) {
    return res.status(422).json({
      errors: {
        body: 'is required',
      },
    });
  }

  if(!body._gender) {
    return res.status(422).json({
      errors: {
        author: 'is required',
      },
    });
  }

  if(!body._dateofbirth) {
    return res.status(422).json({
      errors: {
        author: 'is required',
      },
    });
  }

  if(!body._registration_date) {
    return res.status(422).json({
      errors: {
        author: 'is required',
      },
    });
  }

  if(!body._first_parent) {
    return res.status(422).json({
      errors: {
        author: 'is required',
      },
    });
  }

  if(!body._second_parent) {
    return res.status(422).json({
      errors: {
        author: 'is required',
      },
    });
  }

  if(!body._guardian) {
    return res.status(422).json({
      errors: {
        author: 'is required',
      },
    });
  }

  const finalStudent = new Students(body);
  return finalStudent.save()
    .then(() => res.json({ student: finalStudent.toJSON() }))
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Students.find()
    .sort({ createdAt: 'descending' })
    .then((students) => res.json({ students: students.map(student => student.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Students.findById(id, (err, student) => {
    if(err) {
      return res.sendStatus(404);
    } else if(student) {
      req.student = student;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    student: req.student.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._first_name !== 'undefined') {
    req.student._first_name = body._first_name;
  }

  if(typeof body._last_name !== 'undefined') {
    req.student._last_name = body._last_name;
  }

  if(typeof body._gender !== 'undefined') {
    req.student._gender = body._gender;
  }

  if(typeof body._dateofbirth !== 'undefined') {
    req.student._dateofbirth = body._dateofbirth;
  }

  if(typeof body._registration_date !== 'undefined') {
    req.student._registration_date = body._registration_date;
  }

  if(typeof body._attendance !== 'undefined') {
    req.student._attendance = body._attendance;
  }

  if(typeof body._first_parent !== 'undefined') {
    req.student._first_parent = body._first_parent;
  }

  if(typeof body._second_parent !== 'undefined') {
    req.student._second_parent = body._second_parent;
  }

  if(typeof body._guardian !== 'undefined') {
    req.student._guardian = body._guardian;
  }

  return req.student.save()
    .then(() => res.json({ student: req.student.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Students.findByIdAndRemove(req.student._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;