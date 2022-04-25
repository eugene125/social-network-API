const router = require("express").Router();

const controller = require("../../controllers/userController");

router.route("/").get(controller.getAllUsers).post(controller.createUser);

router.route("/:userId").get(controller.getSingleUser).put(controller.updateSingleUser).delete(controller.deleteSingleUser);

router.route("/:userId/friends/:friendId").post(controller.addFriend).delete(controller.deleteFriend)

module.exports = router;