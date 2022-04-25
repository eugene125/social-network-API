const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

const getAllThoughts = async (req, res) => {
    try {
        const allThoughts = await Thought.find();
        res.json(allThoughts);
    }
    catch {
        console.error(err);
        res.status(500).json(err);
    };
};

const createThought = async (req, res) => {
    try {
        const createThought = await Thought.create(req.body);
        res.json(createThought);
    }
    catch {
        console.error(err);
        res.status(500).json(err);
    };
};

const getSingleThought = async (req, res) => {
    try {
        const getThought = await Thought.findById(req.params.userId);
        res.json(getThought);
    }
    catch {
        console.error(err);
        res.status(500).json(err);
    };
};

const updateSingleThought = async (req, res) => {
    try {
        const updateThought = await Thought.updateOne(req.params.userId);
        res.json(updateThought);
    }
    catch {
        console.error(err);
        res.status(500).json(err);
    };
};

const deleteSingleThought = async (req, res) => {
    try {
        const deleteThought = await Thought.deleteOne(req.params.userId);
        res.json(deleteThought);
    }
    catch {
        console.error(err);
        res.status(500).json(err);
    };
};

const createReaction = async (req, res) => {
    try {
        const createReaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );
        res.json(createReaction);
    }
    catch {
        console.error(err);
        res.status(500).json(err);
    };
};

const deleteReaction = async (req, res) => {
    try {
        const deleteReaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );
        res.json(deleteReaction);
    }
    catch {
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