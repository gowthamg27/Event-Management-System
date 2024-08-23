const Speaker = require('../../models/Speaker');

exports.createSpeaker = async (req, res) => {
  try {
    const newSpeaker = new Speaker(req.body);
    const savedSpeaker = await newSpeaker.save();
    res.status(201).json(savedSpeaker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllSpeakers = async (req, res) => {
  try {
    const speakers = await Speaker.find();
    res.json(speakers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSpeaker = async (req, res) => {
  try {
    const updatedSpeaker = await Speaker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSpeaker) {
      return res.status(404).json({ message: 'Speaker not found' });
    }
    res.json(updatedSpeaker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSpeaker = async (req, res) => {
  try {
    const deletedSpeaker = await Speaker.findByIdAndDelete(req.params.id);
    if (!deletedSpeaker) {
      return res.status(404).json({ message: 'Speaker not found' });
    }
    res.json({ message: 'Speaker deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};