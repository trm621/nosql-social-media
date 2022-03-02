const { User, Thought } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
          path: "friends",
          select: "-__v"
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
          path: "friends",
          select: "-__v"
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },

    createUser({ body }, res) {
        User.create(body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(400).json(err))
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No user found with that id!" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteUserAndThoughts({ params }, res) {
      User.findOneAndDelete({ _id: params.id }).then((deletedUser) => {
        if (!deletedUser) {
          res.status(404).json({ message: "No user found with this id!"});
          return;
        }

        Thought.deleteMany({ _id: { $in: deletedUser.thoughts } }).then(() => {
        res.status(200).json({
          message: "User and associated data deleted!"
        })
      })
    })
    },
    
    addFriend({ params, body }, res ) {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: params.friendId } },
          { new: true, runValidators: true }
        )
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json*{ message: "No user found with this id!" }
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.json(err))
    },
    deleteFriend({ params }, res) {
      User.findOneAndDelete(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true, runValidators: true }
      )
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json*{ message: "No user found with this id!" }
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => res.json(err))
    }
};

module.exports = userController;