const { User, Thought } = require('../models');

module.exports = {

    async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought.find()
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getThoughtById(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.id })
            res.status(200).json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body)
            
            await User.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { thoughts: thoughtData._id } },
                { new: true }
            );

            res.status(200).json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true }
            );
            
            const updatedThought = await Thought.findOne({ _id: req.params.id })
            res.status(200).json(updatedThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            // Delete the thought
            const thoughtData = await Thought.findOneAndDelete({ _id: req.params.id })

            // Remove thought id from user's `thoughts` field
            const updatedUser = await User.findOneAndUpdate(
                { username: thoughtData.username },
                { $pull: { thoughts: thoughtData._id } },
                { new: true }
            );
            res.status(201).json({ message: 'Thought deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};
