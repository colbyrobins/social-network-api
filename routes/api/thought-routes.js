const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

const {
    createReaction,
    deleteReaction
} = require('../../controllers/reaction-controller');

router
    .route('/')
    .get(getAllThoughts)

router
    .route('/:id')
    .get(getThoughtById)
    .post(createThought)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:id/reactions')
    .post(createReaction)

router
    .route('/:id/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;
