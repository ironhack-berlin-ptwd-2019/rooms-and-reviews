var express = require('express');
var router = express.Router();

const Room = require('../models/room')

// middleware
const isAuthenticated = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.redirect('/login')
  }
}

// GET /rooms
router.get('/', function (req, res, next) {
  Room.find().then((rooms) => {
    res.render('rooms/index', { rooms, user: req.user });
  })
});

// GET /rooms/add
router.get('/add', isAuthenticated, function (req, res, next) {
  res.render('rooms/add')
});

// POST /rooms
router.post('/', isAuthenticated, function (req, res, next) {
  let { name, description } = req.body
  Room.create({ name, description, owner: req.user }).then(() => {
    res.redirect('/rooms')
  })
});

// GET /rooms/:room_id/edit
router.get('/:room_id/edit', isAuthenticated, function (req, res, next) {
  Room.findById(req.params.room_id).then((room) => {
    if (room.owner !== req.user._id) {
      res.redirect('/login')
    } else {
      res.render('rooms/edit', { room })
    }
  })
});

// POST /rooms/:room_id
router.post('/:room_id', isAuthenticated, function (req, res, next) {
  let { name, description } = req.body

  Room.findById(req.params.room_id).then((room) => {
    if (room.owner !== req.user._id) {
      res.redirect('/login')
    } else {
      Room.findByIdAndUpdate(req.params.room_id, { name, description }).then(() => {
        res.redirect('/rooms')
      })
    }
  })
});

module.exports = router;
