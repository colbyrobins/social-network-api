const { User } = require('../models');

module.exports = {
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            res.status(200).json(user);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            res.status(200).json(user);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};