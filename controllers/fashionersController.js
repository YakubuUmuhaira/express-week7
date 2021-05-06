const Fashioner = require("../models/fashionerSchema");

//adding a new Fashioner
const createFashioner = async (req, res) => {
  const newFashioner = new Fashioner({
    name: req.body.name,
    gender: req.body.gender,
    location: req.body.location,
    services: req.body.services,
  });

  await newFashioner.save();
  res.status(201).json(newFashioner);
};
//get all Fashioners
const getAllFashioners = async (req, res) => {
  const fashioners = await Fashioner.find();
  res.json(fashioners);
};

//get all Fashioner
const getSingleFashioner = async (req, res) => {
  const fashioner = await Fashioner.findById(req.params._id);
  res.json(fashioner);
};

//update a Fashioner
const updateFashioner = async (req, res) => {
  const foundFashioner = await Fashioner.findById(req.params._id);
  if (foundFashioner) {
    (foundFashioner.name = req.body.name),
      (foundFashioner.gender = req.body.gender),
      (foundFashioner.location = req.body.location),
      (foundFashioner.services = req.body.services);

    const updatedFashioner = await foundFashioner.save();
    res.json({ updatedFashioner: updatedFashioner });
  }
};

//delete a Fashioner
const deleteFashioner = async (req, res) => {
  const foundFashioner = await Fashioner.findById(req.params._id);
  if (foundFashioner) {
    foundFashioner.remove();
    res.json({ msg: `${foundFashioner.name} removed` });
  } else {
    res.status(404).json({ error: "Fashioner not found" });
  }
};

module.exports = {
  createFashioner,
  getAllFashioners,
  getSingleFashioner,
  updateFashioner,
  deleteFashioner,
};
