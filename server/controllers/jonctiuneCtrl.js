module.exports = db => {
    return {
      create: (req, res) => {
        db.models.Junction.create(req.body).then(() => {
          res.send({ success: true });
        }).catch(() => res.status(401));
      },
  
      update: (req, res) => {
        db.models.Junction.update(req.body, { where: { id: req.body.id } }).then(() => {
          res.send({ success: true })
        }).catch(() => res.status(401));
      },
  
      findAll: (req, res) => {
        db.query(`SELECT id, id_person, id_car
        FROM "Junction"
        ORDER BY id`, { type: db.QueryTypes.SELECT }).then(resp => {
          res.send(resp);
        }).catch(() => res.status(401));
      },
  
      findMasini: (req, res) => {
        db.query(`SELECT id, id_person, id_car
        FROM "Junction" WHERE id_person = ${req.params.id_person}
        ORDER BY id`, { type: db.QueryTypes.SELECT }).then(resp => {
          res.send(resp);
        }).catch(() => res.status(401));
      },

      getMasini: (req, res) => {
        db.query(`SELECT ${req.params.id_cars}
        FROM "Junction" WHERE id_person = ${req.params.id_person}
        ORDER BY id`, { type: db.QueryTypes.SELECT }).then(resp => {
          res.send(resp);
        }).catch(() => res.status(401));
      },
  
      destroy: (req, res) => {
        db.query(`DELETE FROM "Junction" WHERE id = ${req.params.id}`, { type: db.QueryTypes.DELETE }).then(() => {
          res.send({ success: true });
        }).catch(() => res.status(401));
      },

      destroyCareNuSuntInArray: (req, res) => {
        db.query(`DELETE FROM "Junction" WHERE ${req.params.id_car} NOT IN (${req.params.arieMasini.split(',')}) AND ${req.params.id_person_tag} = ${req.params.id_person}`, { type: db.QueryTypes.DELETE }).then(() => {
          res.send({ success: true });
        }).catch(() => res.status(401));
      },

      destroySpecific: (req, res) => {
        db.query(`DELETE FROM "Junction" WHERE ${req.params.columnName} = ${req.params.id}`, { type: db.QueryTypes.DELETE }).then(() => {
          res.send({ success: true });
        }).catch(() => res.status(401));
      }
    };
  };
  