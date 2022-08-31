const { User, Thought, Reaction } = require('../models')

module.exports = {
    // Grabbing all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((error) => res.status(500).json(error))
    },

    // Grabbing a single thought
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought here...' })
                    : res.json(thoughts)
            )
            .catch((error) => res.status(500).json(error));
    },

    // Creating a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughts) => {
                User.findOneAndUpdate(
                    { username: thoughts.username },
                    { $push: { thoughts: thoughts._id } },
                    { new: true }
                )
                    .then(() => res.json({ message: `${thoughts.username} posted a thought!` }))
            })
            .catch((error) => res.status(500).json(error))
    },

    // Updating a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought here...' })
                    : res.json(thoughts)
            )
            .catch((error) => res.status(500).json(error));
    },

    // Deleting a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought here' })
                    : res.json({ message: "Thought deleted!" })
            )
            .catch((error) => res.status(500).json(error));
    },

    // Adding a reaction to a thought
    addReaction(req, res) {
        Reaction.create(req.body)
            .then((reaction) => {
                Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $push: { reactions: reaction._id } },
                    { runValidators: true, new: true }
                )
                    .then(() => res.json({ message: "Reaction added!" }))
            })
            .catch((error) => res.status(500).json(error))
    },

    // Deleting a reaction on a thought
    deleteReaction(req, res) {
        Reaction.deleteOne({ _id: req.params.reactionId }).then(() => {
            Thought.findOneAndUpdate(
                { _id: req.params.thoughtId }, 
                { $pull: { reactions: req.params.reactionId } }, 
                { new: true })
                .then((thoughts) =>
                    !thoughts
                        ? res.status(404).json({ message: 'No thought here' })
                        : res.json(thoughts)
                )
        })
            .catch((error) => res.status(500).json(error))
    }

}