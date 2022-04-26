const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
};

const createUser = async (req, res) => {
    try {
        const createUser = await User.create(req.body);
        res.json(createUser);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
};

const getSingleUser = async (req, res) => {
    try {
        const getUser = await User.findById(req.params.userId);
        res.json(getUser);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
};

const updateSingleUser = async (req, res) => {
    try {
        const updateUser = await User.updateOne(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        res.json(updateUser);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
};

const deleteSingleUser = async (req, res) => {
    try {
        const deleteUser = await User.deleteOne( { _id: req.params.userId } );
        res.json(deleteUser);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
};

const addFriend = async (req, res) => {
    try {
        const addFriend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        res.json(addFriend);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
};

const deleteFriend = async (req, res) => {
    try {
        const deleteFriend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
        res.json(deleteFriend);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
};

module.exports = {
    getAllUsers,
    createUser,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    addFriend,
    deleteFriend
}