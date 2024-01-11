const { User, Thought } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const userData = await User.find()
            
            if (!userData) {
                res.status(404).json({ message: 'No users found!' });
                return;
            }

            res.json(userData);
        } catch (err) {
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
            
            const user = await User.findOne({ username: req.body.username })
            if (user) {
                res.status(400).json({ message: 'Username already exists!' });
                return;
            }

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
            );
            
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            } 
            res.status(200).json({ data: userData, message: 'User updated!' });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Server side error!' });
        }
    },
    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete({ _id: req.params.id })
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            // Delete thoughts created by the user
            await Thought.deleteMany({ username: userData.username });
            
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}
