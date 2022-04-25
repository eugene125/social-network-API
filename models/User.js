const { Schema, model } = require("mongoose")

//Creating the Student model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
            validate: {
                validator: function (v) {
                    return /\d{3}-\d{3}-\d{4}/.test(v);
                },
            }
        },
        thoughts: [thoughtsSchema],
        friends: [this]
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

userSchema
.virtual("friendCount")
.get(function() {return this.friends.length})

// Initializing User model
const User = model("user", userSchema)

module.exports = User;