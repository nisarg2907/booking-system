const Room = require("../models/room");

// get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error("Error getting rooms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
