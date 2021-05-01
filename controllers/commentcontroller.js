const express = require("express");
const router = express.Router();

const validateSession = require("../middleware/validate-session");

const Comment = require("../db").import("../models/comment");

router.get("/comment", validateSession, function (req, res) {
  res.send("Hey!! This is a comment route!");
});

/****COMMMENT CREATE*****/
router.post("/add/:entryId", validateSession, (req, res) => {
  const commentEntry = {
    user_id: req.user.id,
    topicId: req.params.entryId,
    note: req.body.comment.note,
  };

  const query = { where: { id: req.params.entryId } };
  Comment.create(commentEntry, query)

    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/mine", validateSession, (req, res) => {
  let userid = req.user.id;
  Comment.findAll({
    where: { user_id: userid },
  })
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/update/:entryId", validateSession, function (req, res) {
  const updateCommentEntry = {
    note: req.body.comment.note,
  };

  const query = { where: { id: req.params.entryId, user_id: req.user.id } };

  Comment.update(updateCommentEntry, query)
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, user_id: req.user.id } };

  Comment.destroy(query)
    .then(() => res.status(200).json({ message: "Comment Removed" }))
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

module.exports = router;
