const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

router.route("/")
    .get(getAllThoughts)

router
    .route('/:userId')
    .post(addThought)

router
    .route(':thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .post(addReaction)
    .delete(removeThought);

router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;