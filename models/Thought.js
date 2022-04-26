const { Schema, model } = require("mongoose");

// Creating reaction schema. Must come before thoughtsSchema
const reactionSchema = new Schema(
    {
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            virtuals: true
        },
        timestamps: true
    }
);

// Creating the Thoughts model
const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        timestamps: true,
    }
);

thoughtsSchema.virtual("reactionCount").get(function () { return this.reactions.length })

const Thought = model("thought", thoughtsSchema);

module.exports = { Thought, thoughtsSchema };