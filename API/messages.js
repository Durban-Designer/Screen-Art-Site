var express = require("express");
var mongodb = require("mongodb");
var _ = require("lodash");
var bodyParser = require("body-parser");
var passport = require("passport");
var passportJWT = require("passport-jwt");
var jwt = require('jsonwebtoken');
var app = express();
var router = express.Router();
var mongoose = require("mongoose");
var Lead = mongoose.model("Lead");
var User = mongoose.model("User");
var Message = mongoose.model("Message");
var bcrypt = require('bcryptjs');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
jwtOptions.secretOrKey = 'LokisBreath-420';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  User.findOne({"_id": jwt_payload.id}, function(err, user) {
    if (err) {
          return next(err, false);
      }
      if (user) {
          return next(null, user);
      } else {
          return next(null, false);
      }
  });
});

app.use(passport.initialize());
passport.use(strategy);
app.use(bodyParser.json());

router.post("/", (req,res) => {
  var newMessage = new Message({
  name: req.body.name,
  phone: req.body.phone,
  email: req.body.email,
  status: req.body.status,
  message: req.body.message,
  leadId: req.body.leadId,
  time: req.body.time
  })

  newMessage.save((err, result) => {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
})

router.get("/", passport.authenticate('jwt', { session: false }),(req, res) => {
  Message.find({},function (err, messages) {
    if (err) {
      res.send(err);
    } else {
      res.send(messages);
    }
  })
})

router.get("/name/:name", passport.authenticate('jwt', { session: false }),(req, res) => {
  var messageName = req.params["name"];
  Message.find({"name": {$regex: '^' + messageName}},function (err, messages) {
    if (err) {
      res.send(err);
    } else {
      res.send(messages);
    }
  })
})

router.get("/:id", passport.authenticate('jwt', { session: false }),(req, res) => {
  var messageid = new mongodb.ObjectID(req.params["id"]);
  Message.find({"_id": messageid},function (err, messages) {
    if (err) {
      res.send(err);
    } else {
      res.send(messages);
    }
  })
})

router.put("/:id", passport.authenticate('jwt', { session: false }),(req, res) => {
  var messageid = new mongodb.ObjectID(req.params["id"]);
  Message.find({"_id": messageid},function (err, message) {
    if (err) {
        res.status(500).send(err);
    } else {
        var message = message[0];
        message.name = req.body.name || message.name;
        message.phone = req.body.phone || message.phone;
        message.email = req.body.email || message.email;
        message.status = req.body.status || message.status;
        message.message = req.body.message || message.message;
        message.leadId = req.body.leadId || message.leadId;
        message.time = req.body.time || message.time;

        message.save(function (err, message) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(message);
        });
    }
});
})

router.delete("/:id", passport.authenticate('jwt', { session: false }),(req, res) => {
  var messageid = new mongodb.ObjectID(req.params["id"]);
  Message.find({_id: messageid}).remove().then(() => {
    console.log("success");
    res.send("success");
  })
})

module.exports = router;
