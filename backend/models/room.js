const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  room_number: { type: String, required: true, unique: true },
  room_type: { type: String, required: true },
  capacity: { type: Number, required: true },
  images: [String], 
  location: { type: String, required: true },
  hotel_name: { type: String, required: true },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
 
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
