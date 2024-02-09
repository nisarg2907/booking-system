const Reservation = require("../models/reservation");
const Room = require("../models/room");
const User = require("../models/user");

exports.bookRoom = async (req, res) => {
  try {
    const { user_id, room_id, start_time, end_time } = req.body;

    // Validate input data
    if (!user_id || !room_id || !start_time || !end_time) {
      return res.status(400).json({ error: "Invalid input data." });
    }

    // Check if the user and room exist
    const userExists = await User.findById(user_id);
    const roomExists = await Room.findById(room_id);

    if (!userExists || !roomExists) {
      return res.status(404).json({ error: "User or room not found." });
    }

    // Check if the room is available for the given time range
    const existingReservations = await Reservation.find({
      room_id,
      $or: [
        { start_time: { $lt: end_time }, end_time: { $gt: start_time } },
        { start_time: { $lt: start_time }, end_time: { $gt: end_time } },
      ],
    });

    if (existingReservations.length > 0) {
      return res
        .status(409)
        .json({ error: "Room is already booked for the selected time range." });
    }

    // Create a new reservation
    const newReservation = new Reservation({
      user_id,
      room_id,
      start_time,
      end_time,
    });

    // Save the reservation to the database
    await newReservation.save();

    // Update the Room's bookings array
    await Room.findByIdAndUpdate(room_id, {
      $push: { bookings: newReservation._id },
    });

    // Update the User's bookings array
    await User.findByIdAndUpdate(user_id, {
      $push: { bookings: newReservation._id },
    });

    // Retrieve the room details
    const bookedRoom = await Room.findById(room_id);

    res.status(201).json({
      message: "Room booked successfully.",
      reservation: newReservation,
      room: bookedRoom, // Include the room details in the response
    });
  } catch (error) {
    console.error("Error booking room:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getuserRooms = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by userId and populate the bookings field with reservation details
    const user = await User.findById(userId).populate("bookings");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Extract relevant information from each booking
    const userRooms = user.bookings.map((booking) => {
      return {
        room_id: booking.room_id,
        start_time: booking.start_time,
        end_time: booking.end_time,
      };
    });

    // Retrieve corresponding room details
    const foundRooms = await Promise.all(
      userRooms.map(async (room) => {
        const roomDetails = await Room.findById(room.room_id);
        return {
          _id: roomDetails._id,
          room_type: roomDetails.room_type,
          capacity: roomDetails.capacity,
          location: roomDetails.location,
          hotel_name: roomDetails.hotel_name,
          start_time: room.start_time,
          end_time: room.end_time,
        };
      })
    );

    res.status(200).json({ foundRooms });
  } catch (error) {
    console.error("Error fetching user rooms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

