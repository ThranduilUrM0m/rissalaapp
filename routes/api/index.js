const router = require('express').Router();

router.use('/articles', require('./articles'));
router.use('/letters', require('./letters'));
router.use('/students', require('./students'));
router.use('/reports', require('./reports'));
router.use('/homeworks', require('./homeworks'));
router.use('/exams', require('./exams'));
router.use('/courses', require('./courses'));
router.use('/subjects', require('./subjects'));
router.use('/modules', require('./modules'));
router.use('/classrooms', require('./classrooms'));
router.use('/schools', require('./schools'));
router.use('/events', require('./events'));

module.exports = router;