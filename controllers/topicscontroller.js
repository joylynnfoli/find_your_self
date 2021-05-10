const express = require("express");
const router = express.Router();

const validateSession = require("../middleware/validate-session");

const Topics = require("../db").import("../models/topics");

const Comment = require("../db").import("../models/comment");

router.get("/practice", validateSession, function (req, res) {
  res.send("Hey!! This is a practice route!");
});

router.get("/about", function (req, res) {
  res.send("Hey!! This is the about route!");
});
/****Topics CREATE*****/
// router.post("/add", validateSession, (req, res) => { 
router.post("/add", (req, res) => {
  const topicsEntry = {
    user_id: req.user.id,
    playlistId: req.body.topics.playlistId,
    title: req.body.topics.title,
    note: req.body.topics.note,
  };
  Topics.create(topicsEntry)
    .then((Topics) => res.status(200).json(Topics))
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

router.get("/mine", (req, res) => {
  let userid = req.user.id;
  Topics.findAll({
    where: { user_id: userid },
  })
    .then((Topics) => res.status(200).json(Topics))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/all", (req, res) => {
    Topics.findAll({
      // where: { id: req.params.id },
      // include: Comment
    })
      .then((Topics) => res.status(200).json(Topics))
      .catch((err) => res.status(500).json({ error: err }));
});

router.get("/one/:id", (req, res) => {
  Topics.findOne({
    where: {id: req.params.id}, 
    include: Comment
  })
  .then((Topics) => res.status(200).json(Topics))
  .catch((err) => res.status(500).json({ error: err }));
});

router.put("/update/:entryId", validateSession, function (req, res) {
  const updateTopicsEntry = {
    note: req.body.topics.note,
  };

  const query = { where: { id: req.params.entryId } };
  Topics.update(updateTopicsEntry, query)
    .then((Topics) => res.status(200).json(Topics))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id } };

  Topics.destroy(query)
    .then(() => res.status(200).json({ message: "URL Removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
