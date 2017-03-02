const express = require('express');
const ensureLogin = require('connect-ensure-login');

const protRoutes = express.Router();

// protRoutes.use((req, res, next) => {
//     if (req.user) {
//       next();
//     } else {
//       res.redirect('/login');
//     }
// });
// function needsLogin (req, res, next) {
//     if (req.user) {
//       next();
//     } else {
//       res.redirect('/login');
//     }
// }

// protRoutes.get('/secret', (req, res, next) => {
//   res.send('Shhhhhhhhhhhh it\'s a secret.');
// });
// protRoutes.get('/kgb-files', (req, res, next) => {
//   res.send('In Soviet Russia, files store you.');
// });

// protRoutes.get('/secret',  needsLogin, (req, res, next) => {
//   res.send('Shhhhhhhhhhhh it\'s a secret.');
// });
// protRoutes.get('/kgb-files', needsLogin, (req, res, next) => {
//   res.send('In Soviet Russia, files store you.');
// });

protRoutes.get('/secret',  (req, res, next) => {
  res.send('Shhhhhhhhhhhh it\'s a secret.');
});
protRoutes.get('/kgb-files', (req, res, next) => {
  res.send('In Soviet Russia, files store you.');
});

module.exports =  protRoutes;
