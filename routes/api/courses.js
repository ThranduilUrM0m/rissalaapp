const mongoose = require('mongoose');
const router = require('express').Router();
const Courses = mongoose.model('Courses');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body._name) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }

  if(!body._abilities_inview) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }

  if(!body._sessions) {
    return res.status(422).json({
      errors: {
        body: 'is required',
      },
    });
  }

  const finalCourse = new Courses(body);
  return finalCourse.save()
    .then(() => res.json({ course: finalCourse.toJSON() }))
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Courses.find()
    .sort({ createdAt: 'descending' })
    .then((courses) => res.json({ courses: courses.map(course => course.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Courses.findById(id, (err, course) => {
    if(err) {
      return res.sendStatus(404);
    } else if(course) {
      req.course = course;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    course: req.course.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._name !== 'undefined') {
    req.course._name = body._name;
  }

  if(typeof body._abilities_inview !== 'undefined') {
    req.course._abilities_inview = body._abilities_inview;
  }

  if(typeof body._sessions !== 'undefined') {
    req.course._sessions = body._sessions;
  }

  return req.course.save()
    .then(() => res.json({ course: req.course.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Courses.findByIdAndRemove(req.course._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;