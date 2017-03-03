const express = require('express');
const ensure = require('connect-ensure-login');
const multer = require('multer');

const Room = require('../models/room-model');

const roomsRoutes = express.Router();
const uploads = multer({ dest: '__dirname' + '/../public/uploads/' });

roomsRoutes.get('/rooms/index', ensure.ensureLoggedIn(), (req, res, next) => {
  Room.find({owner: req.user._id}, (err, myRooms) => {
    if (err) { return next(err); }

    res.render('rooms/room-index', { rooms: myRooms });
  });
});

roomsRoutes.get('/rooms/new', ensure.ensureLoggedIn(), (req, res, next) => {
  res.render('rooms/new.ejs', {
    message: req.flash('success')
  });
});

// router.post('/rooms', ensureAuthenticated, (req, res, next) => {
roomsRoutes.post('/rooms',
  ensure.ensureLoggedIn(),
  // ('picture') refers to name="picture" in the form
  uploads.single('picture'),

   (req, res, next) => {
     const filename = req.file.filename;

    const newRoom = new Room ({
      name:  req.body.name,
      desc:  req.body.desc,
      picture: `/uploads/${filename}`,
      owner: req.user._id   // <-- we add the user ID
    });

  newRoom.save ((err) => {
    if (err) {
      next(err);
      return;
    } else {
      req.flash('success', 'Your room has been created');
      res.redirect('/rooms/new');
    }
  });
});



module.exports = roomsRoutes;
