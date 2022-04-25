const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

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

thoughtsSchema.virtual("reactionCount").get(function () { return this.reaction.length })

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
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

const Thought = model("thought", thoughtsSchema);

module.exports = Thought;