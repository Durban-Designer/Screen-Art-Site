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
var Prospect = mongoose.model("Prospect");
var User = mongoose.model("User");
var bcrypt = require('bcryptjs');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var recordsPerPage = 8;

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
  var newProspect = new Prospect({
  name: req.body.name,
  phone: req.body.phone,
  email: req.body.email,
  address: req.body.address,
  checkedIn: req.body.checkedIn,
  comment: req.body.comment
  })

  newProspect.save((err, result) => {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
})

router.post("/checkin", (req,res) => {
  let phone = req.body.phone
  Prospect
  .find({"phone": phone})
  .exec(function (err, prospect) {
    if (err) {
      res.send(err);
    } else {
      var prospect = prospect[0];
      prospect.checkedIn = true
      prospect.save(function (err, prospect) {
          if (err) {
              res.status(500).send(err)
          }
          res.send(prospect.name);
      })
    }
  })
})
router.get("/:page", passport.authenticate('jwt', { session: false }),(req, res) => {
  var pageNum = req.params["page"] || 1;
  Prospect
  .find()
  .skip((pageNum - 1) * recordsPerPage)
  .limit(recordsPerPage)
  .exec(function (err, prospects) {
    if (err) {
      res.send(err);
    } else {
      res.send(prospects);
    }
  })
})

router.get("/name/:name/:page", passport.authenticate('jwt', { session: false }),(req, res) => {
  var prospectName = req.params["name"];
  var pageNum = req.params["page"] || 1;
  Prospect
  .find({"name": {$regex: '^' + prospectName}})
  .skip((pageNum - 1) * recordsPerPage)
  .limit(recordsPerPage)
  .exec(function (err, prospects) {
    if (err) {
      res.send(err);
    } else {
      res.send(prospects);
    }
  })
})

router.get("/id/:id", passport.authenticate('jwt', { session: false }),(req, res) => {
  var prospectid = new mongodb.ObjectID(req.params["id"]);
  Prospect.find({"_id": prospectid},function (err, prospects) {
    if (err) {
      res.send(err);
    } else {
      res.send(prospects);
    }
  })
})

router.put("/:id", passport.authenticate('jwt', { session: false }),(req, res) => {
  var prospectid = new mongodb.ObjectID(req.params["id"]);
  Prospect.find({"_id": prospectid},function (err, prospect) {
    if (err) {
        res.status(500).send(err);
    } else {
        var prospect = prospect[0];
        prospect.name = req.body.name || prospect.name;
        prospect.phone = req.body.phone || prospect.phone;
        prospect.email = req.body.email || prospect.email;
        prospect.address = req.body.address || prospect.address;
        prospect.checkedIn = req.body.checkedIn || prospect.checkedIn;
        prospect.comment = req.body.comment || prospect.comment;

        prospect.save(function (err, prospect) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(prospect);
        });
    }
});
})

router.delete("/:id", passport.authenticate('jwt', { session: false }),(req, res) => {
  var prospectid = new mongodb.ObjectID(req.params["id"]);
  Prospect.find({_id: prospectid}).remove().then(() => {
    console.log("success");
    res.send("success");
  })
})

module.exports = router;
