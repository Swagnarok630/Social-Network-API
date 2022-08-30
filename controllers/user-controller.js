const {User} = require("../models")

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
    }
}