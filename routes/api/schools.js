const mongoose = require('mongoose');
const router = require('express').Router();
const Schools = mongoose.model('Schools');

router.post('/', (req, res, next) => {
  const { body } = req;
  
  if(!body._name) {
    return res.status(422).json({
      errors: {
        _name: 'is required',
      },
    });
  }
  
  if(!body._address) {
    return res.status(422).json({
      errors: {
        _address: 'is required',
      },
    });
  }
  
  if(!body._principal_name) {
    return res.status(422).json({
      errors: {
        _principal_name: 'is required',
      },
    });
  }
  const finalSchool = new Schools(body);
  return finalSchool.save()
    .then(() => res.json({ school: finalSchool.toJSON() }))
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Schools.find()
    .sort({ createdAt: 'descending' })
    .then((schools) => res.json({ schools: schools.map(school => school.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Schools.findById(id, (err, school) => {
    if(err) {
      return res.sendStatus(404);
    } else if(school) {
      req.school = school;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    school: req.school.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._name !== 'undefined') {
    req.school._name = body._name;
  }

  if(typeof body._address !== 'undefined') {
    req.school._address = body._address;
  }

  if(typeof body._prinipal_name !== 'undefined') {
    req.school._prinipal_name = body._prinipal_name;
  }

  return req.school.save()
    .then(() => res.json({ school: req.school.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Schools.findByIdAndRemove(req.school._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;