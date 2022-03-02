const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionBody: {
        type: String,
        required: [true, "Please enter a reaction between 1 and 280 characters"],
        minLength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: [true, "Please provide a username."]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
    }
  }
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: [ true, "Please add a thought between 1 and 280 characters"],
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: [true, "Please provide a valid username."],
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;