module.exports = app => {
    'use strict';
    const express         = require('express');
    const jonctiuneCtrl = require('../controllers/jonctiuneCtrl')(app.locals.db);
    const router          = express.Router();
  
    router.post('/', jonctiuneCtrl.create);
    router.put('/', jonctiuneCtrl.update);
    router.get('/', jonctiuneCtrl.findAll);
    router.get('/:id_person', jonctiuneCtrl.findMasini);
    router.get('/:id_cars/:id_person', jonctiuneCtrl.getMasini);
    router.delete('/:id', jonctiuneCtrl.destroy);
    router.delete('/:id_car/:arieMasini/:id_person_tag/:id_person', jonctiuneCtrl.destroyCareNuSuntInArray);
    router.delete('/:columnName/:id', jonctiuneCtrl.destroySpecific);
  
    return router;
  };
  