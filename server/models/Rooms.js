const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  roomName: String,
});

roomSchema.methods.findByRoomname = (room, callBack) => {
  return this.model("Room".find({ roomName: room }, callBack));
};

const room = mongoose.model("room", roomSchema);

module.exports = room;
