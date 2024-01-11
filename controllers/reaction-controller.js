const { Thought, reactionSchema, User} = require('../models');

module.exports = {
    async createReaction (req, res) {
        try {
            
            if (!req.body.username) {
                res.status(400).json({ message: 'You must provide a username!' });
                return;
            }
            if (!req.body.reactionBody) {
                res.status(400).json({ message: 'You must provide a reaction!' });
                return;
            }
            const userExists = await User.findOne({ username: req.body.username });
            if (!userExists) {
                res.status(400).json({ message: 'No user found with this username!' });
                return;
            }

            const data = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { reactions: req.body } },
                { new: true }
            );

            res.status(200).json(data);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteReaction (req, res) {
        try {
            console.log(req.params);
            // Delete the reaction
            const thoughtData = await Thought.findByIdAndUpdate(
                req.params.id,
                { $pull: { reactions: { reactionId: req.params.reactionId }}},
                { new: true }
            );
            res.status(201).json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};
