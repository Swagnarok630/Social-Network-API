
const router = require('express').Router();
// const { Thought, Reaction} = require('../../models') moved to controller
const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require("../../controllers/thought-controller")

//TODO: ROUTE TO GET ALL THOUGHTS
//TODO: ROUTE TO CREATE A NEW THOUGHT
router.route("/")
    .get(getThoughts)
    .post(createThought)

//TODO: ROUTE TO GET SINGLE THOUGHT BASED ON THOUGHT ID
//TODO: ROUTE TO UPDATE A THOUGHT
//TODO: ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
router.route("/:thoughtId")
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought)

//TODO: ROUTE TO ADD REACTION TO A THOUGHT
router.route("/:thoughtId/reactions")
    .post(addReaction)

//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
router.route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction)

module.exports = router;
