const {User, Thought} = require("../models")

module.exports = {
    getUsers(req, res) {
        User.find()
                .populate({ path: "thoughts", select: "-__v" })
                .populate({ path: "friends", select: "-__v" })
            .then((users) => res.json(users))
            .catch((error) => res.status(500).json(error))
    },

    getOneUser(req, res) {
        User.findOne({ _id: req.params.id})
                .populate({ path: "thoughts", select: "-__v" })
                .populate({ path: "friends", select: "-__v" })
            .then((users) =>
                !users
                  ? res.status(404).json({ message: 'No user with that ID' })
                  : res.json(users)
              )
              .catch((error) => res.status(500).json(error));
    },

    createUser(req, res) {
        User.create(req.body)
            .then((users) => res.json(users))
            .catch((error) => res.status(500).json(error))
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true}
        )
            .then((users) =>
                !users
                  ? res.status(404).json({ message: 'No user with that ID' })
                  : res.json(users)
            )
            .catch((error) => res.status(500).json(error));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then((users) =>
                !users
                  ? res.status(404).json({ message: 'No user with that ID' })
                  : Thought.deleteMany({ _id: { $in: users.thoughts }})
            )
            .then(() => res.json({ message: "User and thoughts deleted!"}))
            .catch((error) => res.status(500).json(error));
    },

    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.id}, {$push: { friends: req.params.friendId}}, { new: true})
            .then((users) =>
                !users
                  ? res.status(404).json({ message: 'No user with that ID' })
                  : res.json(users)
            )
            .catch((error) => res.status(500).json(error))
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.id}, {$pull: { friends: req.params.friendId}}, { new: true})
        .then((users) =>
            !users
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(users)
        )
        .catch((error) => res.status(500).json(error))
    }
}