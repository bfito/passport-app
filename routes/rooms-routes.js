const express = require('express');
const roomsRoutes = express.Router();

roomsRoutes.get('rooms/new', (req, res, next) => {
  res.render('rooms/new.ejs', {
    message: req.flash('success')
  });
});

// router.post('/rooms', ensureAuthenticated, (req, res, next) => {
router.post('/rooms', (req, res, next) => {
  const newRoom = new Room ({
    name:  req.body.name,
    desc:  req.body.desc,
    picture: "https://media.giphy.com/media/shGbMNwth7X9K/giphy.gif",
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



module.exports = express.Router();
