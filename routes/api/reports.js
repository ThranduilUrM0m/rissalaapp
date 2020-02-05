const mongoose = require('mongoose');
const router = require('express').Router();
const Reports = mongoose.model('Reports');

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

  const finalReport = new Reports(body);
  return finalReport.save()
    .then(() => res.json({ report: finalReport.toJSON() }))
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Reports.find()
    .sort({ createdAt: 'descending' })
    .then((reports) => res.json({ reports: reports.map(report => report.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Reports.findById(id, (err, report) => {
    if(err) {
      return res.sendStatus(404);
    } else if(report) {
      req.report = report;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    report: req.report.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body._due_date !== 'undefined') {
    req.report._due_date = body._due_date;
  }

  if(typeof body._course !== 'undefined') {
    req.report._course = body._course;
  }

  if(typeof body._gender !== 'undefined') {
    req.report._student = body._student;
  }

  return req.report.save()
    .then(() => res.json({ report: req.report.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Reports.findByIdAndRemove(req.report._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;