const mongoose = require('mongoose');
const router = require('express').Router();
const Modules = mongoose.model('Modules');

router.post('/', (req, res, next) => {
    const { body } = req;

    if(!body._name) {
        return res.status(422).json({
            errors: {
                _name: 'is required',
            },
        });
    }
    
    if(!body._subject) {
        return res.status(422).json({
            errors: {
                _subject: 'is required',
            },
        });
    }

    const finalModule = new Modules(body);
    return finalModule.save()
        .then(() => res.json({ module: finalModule.toJSON() }))
        .catch(next);
});

router.get('/', (req, res, next) => {
    return Modules.find()
        .sort({ createdAt: 'descending' })
        .then((modules) => res.json({ modules: modules.map(module => module.toJSON()) }))
        .catch(next);
});

router.param('id', (req, res, next, id) => {
    return Modules.findById(id, (err, module) => {
        if(err) {
            return res.sendStatus(404);
        } else if(module) {
            req.module = module;
            return next();
        }
    }).catch(next);
});

router.get('/:id', (req, res, next) => {
    return res.json({
        module: req.module.toJSON(),
    });
});

router.patch('/:id', (req, res, next) => {
    const { body } = req;

    if(typeof body._name !== 'undefined') {
        req.module._name = body._name;
    }

    if(typeof body._sessions !== 'undefined') {
        req.module._sessions = body._sessions;
    }

    if(typeof body._subject !== 'undefined') {
        req.module._subject = body._subject;
    }
    
    return req.module.save()
        .then(() => res.json({ module: req.module.toJSON() }))
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    return Modules.findByIdAndRemove(req.module._id)
        .then(() => res.sendStatus(200))
        .catch(next);
});

module.exports = router;