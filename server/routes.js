module.exports = app => {
  'use strict';
  const express      = require("express");
  const appPath      = __dirname + '/../client';
  const path         = require('path');
  const errors       = require('./errors');

  /* LOGIN */
  app.use('/api/information', require('./routes/information')(app));

  //masini 
  app.use('/api/car', require('./routes/masini.js')(app));

  //persoane
  app.use('/api/person', require('./routes/persoane.js')(app));

  //jonctiune
  app.use('/api/junction', require('./routes/jonctiune.js')(app));

  app.route('*/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);

  /* BUILD */
  app.use(express.static(path.join(appPath, 'dist/client')));
  app.get('/*', (req, res) => res.sendFile(path.join(appPath, 'dist/client', 'index.html')));

  app.route('*').get(errors[404]);
};
