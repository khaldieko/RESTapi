const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

//Getting all
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Getting One
router.get("/:id", getSubscriber, (req, res) => {
  res.send(res.dieko);
});
//Creating One
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Updating One
router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.dieko.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.dieko.subscribedToChannel = req.body.subscribedToChannel;
  }
  try {
    const updatedDieko = await res.dieko.save();
    res.json(updatedDieko);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Deleting One
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.dieko.remove();
    res.json({ message: "Deleted subscriber" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getSubscriber(req, res, next) {
  let dieko;
  try {
    dieko = await Subscriber.findById(req.params.id);
    if (dieko == null) {
      return res.status(404).json({ message: "Cannot find the subscriber" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.dieko = dieko;
  next();
}

module.exports = router;
