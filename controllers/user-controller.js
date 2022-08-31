const {User, Thought} = require("../models")

module.exports = {
    // Grabbing all users
    getUsers(req, res) {
        User.find()
                // Including users' thoughts
                .populate({ path: "thoughts", select: "-__v" })
                // Including users' friends
                .populate({ path: "friends", select: "-__v" })
            .then((users) => res.json(users))
            .catch((error) => res.status(500).json(error))
    },

    // Grabbing a single user
    getOneUser(req, res) {
        User.findOne({ _id: req.params.id})
                // Including user's thoughts
                .populate({ path: "thoughts", select: "-__v" })
                // Including user's friends
                .populate({ path: "friends", select: "-__v" })
            .then((users) =>
                !users
                  ? res.status(404).json({ message: 'No user with that ID' })
                  : res.json(users)
              )
              .catch((error) => res.status(500).json(error));
    },

    // Creating a user
    createUser(req, res) {
        User.create(req.body)
            .then((users) => res.json(users))
            .catch((error) => res.status(500).json(error))
    },

    // Updating a user
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

    // Deleting a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then((users) =>
                !users
                  ? res.status(404).json({ message: 'No user with that ID' })
                  // Deletes user's thoughts as well when user is deleted
                  : Thought.deleteMany({ _id: { $in: users.thoughts }})
            )
            .then(() => res.json({ message: "User and thoughts deleted!"}))
            .catch((error) => res.status(500).json(error));
    },

    // Adding a friend to a user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.id}, {$push: { friends: req.params.friendId}}, { new: true})
            .then((users) =>
                !users
                  ? res.status(404).json({ message: 'No user with that ID' })
                  : res.json(users)
            )
            .catch((error) => res.status(500).json(error))
    },

    // Deleting a friend from a user's friend list
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