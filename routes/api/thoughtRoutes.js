const router = require("express").Router();

const controller = require("../../controllers/thoughtController");

router.route("/").get(controller.getAllThoughts);

router.route("/create/:userId").post(controller.createThought);

router.route("/:thoughtId").get(controller.getSingleThought).put(controller.updateSingleThought).delete(controller.deleteSingleThought);

router.route("/:thoughtId/reactions").post(controller.createReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(controller.getSingleReaction);

module.exports = router;