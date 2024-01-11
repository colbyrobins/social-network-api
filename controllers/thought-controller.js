const { User, Thought } = require('../models');

module.exports = {

    async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought.find()

            if (!thoughtData) {
                res.status(404).json({ message: 'No thoughts found!' });
                return;
            }

            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getThoughtById(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.id })
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.status(200).json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {

            if (!req.body.username) {
                res.status(400).json({ message: 'You must provide a username!' });
                return;
            }

            if (!req.body.thoughtText) {
                res.status(400).json({ message: 'You must provide a thought!' });
                return;
            }
            
            const userExists = await User.findOne({ username: req.body.username });
            if (!userExists) {
                res.status(400).json({ message: 'No user found with this username!' });
                return;
            }

            const thoughtData = await Thought.create(req.body)
            
            await User.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { thoughts: thoughtData._id } },
                { new: true });

            res.status(200).json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {

            if (!req.body.thoughtText) {
                res.status(400).json({ message: 'You must provide a thought!' });
                return;
            }

            const thoughtExists = await Thought.findOne({ _id: req.params.id });
            if (!thoughtExists) {
                res.status(400).json({ message: 'No thought found with this id found!' });
                return;
            }

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
            const thoughtExists = await Thought.findOne({ _id: req.params.id });
            if (!thoughtExists) {
                res.status(400).json({ message: 'No thought found with this id to delete!' });
                return;
            }
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
