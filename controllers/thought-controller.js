const { User, Thought, Reaction} = require('../models')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((error) => res.status(500).json(error))
},

    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId})
            .then((thoughts) =>
                !thoughts
                  ? res.status(404).json({ message: 'No thought here...' })
                  : res.json(thoughts)
             )
            .catch((error) => res.status(500).json(error));
},

    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughts) => {
                User.findOneAndUpdate(
                    { username: thoughts.username },
                    { $push: { thoughts: thoughts._id}},
                    { new: true }
                )
                .then(() => res.json({ message: `${thoughts.username} posted a thought!` }))
            })
            .catch((error) => res.status(500).json(error))
},

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true}
        )
            .then((thoughts) =>
                !thoughts
                ? res.status(404).json({ message: 'No thought here...' })
                : res.json(thoughts)
            )
            .catch((error) => res.status(500).json(error));
},

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thoughts) =>
                !thoughts
                ? res.status(404).json({ message: 'No thought here' })
                : res.json({ message: "Thought deleted!"})
            )
            .catch((error) => res.status(500).json(error));
},

//     addReaction(req, res) {
//         Reaction.create(req.body)
//             .then((thoughts) => {
//                 Thought.findOneAndUpdate(
//                     { _id: req.params.thoughtId},
//                     { $push: { reactions: req.body}},
//                     { runValidators: true, new: true }
//                 )
//                 .then(() => res.json({ message: "Reaction added!" }))
//             })
//             .catch((error) => res.status(500).json(error))
// },

    addReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId}, {$push: { reactions: req.body}}, { new: true })
            .then((thoughts) =>
                !thoughts
                ? res.status(404).json({ message: 'No thought here' })
                : res.json(thoughts)
            )
            .catch((error) => res.status(500).json(error))
},

    deleteReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId}, {$pull: { reactions: { _id: req.params.reactionId}}}, { new: true })
        .then((thoughts) =>
            !thoughts
            ? res.status(404).json({ message: 'No thought here' })
            : res.json(thoughts)
        )
        .catch((error) => res.status(500).json(error))
}

}