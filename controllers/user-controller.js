const { User, Thought } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const userData = await User.find()
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getUserById(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.id })
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            if (!req.body.username) {
                res.status(400).json({ message: 'Username is required!' });
                return;
            }
            if (!req.body.email) {
                res.status(400).json({ message: 'Email is required!' });
                return;
            }
            const userData = await User.create(req.body)
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true }
            )
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete({ _id: req.params.id })
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}
