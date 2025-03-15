const Sponsor = require('../../models/sponsorModel');

exports.getAllSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find().sort({ createdAt: -1 });
    res.json(sponsors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sponsors', error: error.message });
  }
};

exports.getSponsorById = async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);
    if (!sponsor) {
      return res.status(404).json({ message: 'Sponsor not found' });
    }
    res.json(sponsor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sponsor', error: error.message });
  }
};

exports.createSponsor = async (req, res) => {
  try {
    const sponsorData = {
      name: req.body.name,
      category: req.body.category,
      contact: req.body.contact,
      package: req.body.package,
      status: req.body.status,
      logo: req.body.logo,
      website: req.body.website,
      description: req.body.description,
      sponsorshipAmount: req.body.sponsorshipAmount,
      eventName: req.body.eventName, // Add this line
    };

    const sponsor = await Sponsor.create(sponsorData);
    res.status(201).json({ message: 'Sponsor created successfully', sponsor });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors: validationErrors });
    }
    res.status(500).json({ message: 'Error creating sponsor', error: error.message });
  }
};

exports.updateSponsor = async (req, res) => {
  try {
    const updatedSponsor = await Sponsor.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!updatedSponsor) {
      return res.status(404).json({ message: 'Sponsor not found' });
    }
    res.json(updatedSponsor);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors: validationErrors });
    }
    res.status(400).json({ message: 'Error updating sponsor', error: error.message });
  }
};

exports.deleteSponsor = async (req, res) => {
  try {
    const deletedSponsor = await Sponsor.findByIdAndDelete(req.params.id);
    if (!deletedSponsor) {
      return res.status(404).json({ message: 'Sponsor not found' });
    }
    res.json({ message: 'Sponsor deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting sponsor', error: error.message });
  }
};

exports.getSponsorStats = async (req, res) => {
  try {
    const stats = await Sponsor.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalAmount: { $sum: '$sponsorshipAmount' }
        }
      }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sponsor statistics', error: error.message });
  }
};
