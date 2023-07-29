const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const dbThoughtData = await Thought.find().sort({ createdAt: -1 });
      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  
  // get single thought by id
  getThoughtById: async (req, res) => {
    try {
      const dbThoughtData = await Thought.findById(req.params.thoughtId);

      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }

      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  
  // create a thought
  createThought: async (req, res) => {
    try {
      const dbThoughtData = await Thought.create(req.body);

      const dbUserData = await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: 'Thought created but no user found with this id!' });
      }

      res.json({ message: 'Thought successfully created!' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  
  // update thought
  updateThought: async (req, res) => {
    try {
      const dbThoughtData = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { runValidators: true, new: true }
      );

      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }

      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  
  // delete thought
  deleteThought: async (req, res) => {
    try {
      const dbThoughtData = await Thought.findByIdAndDelete(req.params.thoughtId);

      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }

      const dbUserData = await User.updateMany(
        {},
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  
  // add a reaction to a thought
  addReaction: async (req, res) => {
    try {
      const dbThoughtData = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }

      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  
  // remove reaction from a thought
  removeReaction: async (req, res) => {
    try {
      const dbThoughtData = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }

      res.json(dbThoughtData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
