const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

const getAllThoughts = async (req, res) => {
    try {
        const allThoughts = await Thought.find();
        res.json(allThoughts);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
};

const createThought = async (req, res) => {
    try {
        const createThought = await Thought.create(req.body);
        const updatedUser = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { thoughts: createThought } },
            { runValidators: true, new: true }
        )
        res.json({ createThought, updatedUser });
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
};

const getSingleThought = async (req, res) => {
    try {
        const getThought = await Thought.findById(req.params.thoughtId);
        res.json(getThought);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
};

const updateSingleThought = async (req, res) => {
    try {
        const updateThought = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            req.body,
            { runValidators: true, new: true }
        );
        const updatedUser = await User.findOne({ username: updateThought.username });
        await updatedUser.thoughts.id(req.params.thoughtId).remove();
        await updatedUser.thoughts.push(updateThought);
        await updatedUser.save((err) => console.error(err));
        res.json({ updateThought, updatedUser });
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
};

const deleteSingleThought = async (req, res) => {
    try {
        const deleteThought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId });
        const updatedUser = await User.findOne({ username: deleteThought.username });
        await updatedUser.thoughts.id(req.params.thoughtId).remove();
        await updatedUser.thoughts.push(deleteThought);
        await updatedUser.save((err) => console.error(err));
        res.json(deleteThought);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
};

const createReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate({ _id: req.params.thoughtId })
        await thought.reactions.push(req.body);
        await thought.save((err) => console.error(err));
        res.json(thought);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
};

const deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findById({ _id: req.params.thoughtId });
        await thought.reactions.id(req.params.reactionId).remove();
        await thought.save((err) => console.error(err));
        res.json(thought);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
};

module.exports = {
    getAllThoughts,
    createThought,
    getSingleThought,
    updateSingleThought,
    deleteSingleThought,
    createReaction,
    deleteReaction
}