const express = require('express');
const router = express.Router();

const validateSession = require('../middleware/validate-session');

const Library = require("../db").import("../models/library")

router.get('/practice', validateSession, function(req, res)
{
    res.send('Hey!! This is a practice route!')
})

router.get('/about', function(req, res)
{
    res.send('Hey!! This is the about route!')
})
/****LIBRARY CREATE*****/
router.post("/add", validateSession, (req,res) =>{
const libraryEntry = {
    user_id: req.user.id,
    videoURL: req.body.library.videoURL,
    title:  req.body.library.title,
    note: req.body.library.note
}
Library.create(libraryEntry)
.then((library)=> res.status(200).json
(library))
.catch((err) => res.status (500).json({
    error:err}));
});

router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id;
    Library.findAll({
        where: { user_id: userid },
    })
    .then((library) => res.status(200).json(library))
    .catch((err)=>res.status(500).json({error:err}));
    });

    router.put("/update/:entryId",
    validateSession, function (req, res) {
        const updateLibraryEntry = {
            note: req.body.library.note,
        };

        const query = { where: { id: req.params.entryId, user_id: req.user.id } };
        Library.update(updateLibraryEntry, query)
        .then((library) => res.status(200).json(library))
        .catch((err) => res.status(500).json({ error: err }));
    });
    
    router.delete("/delete/:id", validateSession, function (req, res) {
      const query = { where: { id: req.params.id, user_id: req.user.id } };
    
      Library.destroy(query)
        .then(() => res.status(200).json({ message: "URL Removed" }))
        .catch((err) => res.status(500).json({ error: err }));
    });

module.exports = router;