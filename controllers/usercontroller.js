const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const User = db.import("../models/user");

//register
router.post("/create", (req, res) => {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 13),
    role: req.body.role,
  })
    .then(function createSuccess(user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });

      res.json({
        user: user,
        message: "User successfully created!",
        sessionToken: token,
      });
    })

    .catch((err) => res.status(500).json({ error: err }));
});

// login
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, matches) {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24,
              });
              res.status(200).json({
                user: user,
                message: "user login worked",
                sessionToken: token,
              });
            } else {
              res.status(502).send({ err: "Login Failed" });
            }
          }
        );
      } else {
        res.status(500).json({
          err: "User does not exist",
        });
      }
    })
    .catch((err) =>
      res.status(500).json({
        err: err,
      })
    );
});
/*admin*/
router.put("/admin/:id", function (req, res) {
  const updateUser = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 13),
    role: req.body.user.role,
  };

  const query = { where: { id: req.params.id } };
  User.update(updateUser, query)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

/*user update*/
router.put("/update", function (req, res) {
  const updateUser = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 13),
  };

  const query = { where: { user_id: req.user.id } };
  User.update(updateUser, query)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
