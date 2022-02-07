const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .sort({ _id: -1})
            .then((dbThoughtData) => 
            res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400)
    })
},
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .populate({
                path: "reactions",
                select: "-__v",
            })
            .select("-__v")
            .sort({ _id: -1 })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id! "});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    addThought(req, res) {
        console.log(req.params);
        Thought.create(req.params)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true, 
                    runValidators: true }
                );
            })
            .then(dbUserData => {
                console.log(dbThoughtData);
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with that id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
        },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
            new: true,
            runValidators: true,
        })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                 res.status(404).json(({ message: 'No user found with this id!' }))
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },

    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            return Thought.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true}
            );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json(({ message: 'No thought found with this id!' }))
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },

    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true}
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id!" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;