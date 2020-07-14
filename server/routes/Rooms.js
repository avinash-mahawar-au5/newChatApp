const express = require("express");
const Room = require("../models/Rooms");
const router = express.Router();

router.post("/create-room", async (req, res) => {
  try {
    const { roomName } = req.body;
    let room = await Room.findOne({ roomName });
    if (room) {
      return res
        .status(403)
        .json({ code: 403, response: "Room already taken" });
    } else {
      let newRoom = await Room.create({ roomName });
      res.send(newRoom);
    }
  } catch (e) {
    res.sendStatus(500).json({ error: "There wrer an error" });
  }
});

router.get("/get-rooms", async (req, res) => {
  try {
    let rooms = await Room.find({});

    if (!rooms) {
      return res
        .status(403)
        .json({ code: 403, response: "No rooms are found" });
    } else {
      res.send(rooms);
    }
  } catch (e) {
    res.sendStatus(500).json({ error: "There wrer an error" });
  }
});
module.exports = router;
