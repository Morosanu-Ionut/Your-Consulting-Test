module.exports = db => {
    return {
      create: (req, res) => {
        db.models.Car.create(req.body).then(() => {
          res.send({ success: true });
        }).catch(() => res.status(401));
      },
  
      update: (req, res) => {
        db.models.Car.update(req.body, { where: { id: req.body.id } }).then(() => {
          res.send({ success: true })
        }).catch(() => res.status(401));
      },
  
      findAll: (req, res) => {
        db.query(`SELECT id, denumire_marca, denumire_model, an_fabricatie, capacitate_cilindrica, taxa_impozit
        FROM "Car"
        ORDER BY id`, { type: db.QueryTypes.SELECT }).then(resp => {
          res.send(resp);
        }).catch(() => res.status(401));
      },

      // filtrareMasini: (req, res) => {
      //   db.query(`SELECT id, denumire_marca, denumire_model, an_fabricatie, capacitate_cilindrica, taxa_impozit
      //   FROM "Car"
      //   WHERE denumire_marca LIKE ${req.params.filtru} OR denumire_model LIKE ${req.params.filtru2}
      //   ORDER BY id`, { type: db.QueryTypes.SELECT }).then(resp => {
      //     res.send(resp);
      //   }).catch(() => { res.status(401);});
      // },
  
      find: (req, res) => {
        db.query(`SELECT id, denumire_marca, denumire_model, an_fabricatie, capacitate_cilindrica, taxa_impozit
        FROM "Car" WHERE id = ${req.params.id}`, { type: db.QueryTypes.SELECT }).then(resp => {
          res.send(resp[0]);
        }).catch(() => res.status(401));
      },
      findMasina: (req, res) => {
        db.query(`SELECT id, denumire_marca, denumire_model, an_fabricatie, capacitate_cilindrica, taxa_impozit
        FROM "Car" WHERE ${req.params.masina} = ${req.params.id}`, { type: db.QueryTypes.SELECT }).then(resp => {
          res.send(resp[0]);
        }).catch(() => res.status(401));
      },

      findInArray: (req, res) => {
        db.query(`SELECT id, denumire_marca, denumire_model, an_fabricatie, capacitate_cilindrica, taxa_impozit
        FROM "Car" WHERE id IN (${req.params.arieMasini.split(',')})`, { type: db.QueryTypes.SELECT }).then(resp => {
          res.send(resp);
        }).catch(() => res.status(401));
      },
  
      destroy: (req, res) => {
        db.query(`DELETE FROM "Car" WHERE id = ${req.params.id}`, { type: db.QueryTypes.DELETE }).then(() => {
          res.send({ success: true });
        }).catch(() => res.status(401));
      }
    };
  };
  