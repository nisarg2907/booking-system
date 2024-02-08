const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {passwordEncryption} = require("../utils/password");
const generateJwtToken  = require("../utils/token");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.JWT_SECRET;




// Register function
exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if user with the same username or email already exists
    const existingUser = await User.findOne({  email  });
    if (existingUser) {
      return res.status(400).json({ error: 'User with the same email already exists.' });
    }

    // Hash the password
    const hashedPassword = await passwordEncryption(password);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
  
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
     // Replace with your actual secret key
    console.log(secretKey);
    const token = generateJwtToken(
        {
          name: newUser.username,
          email: newUser.email,
        },
       secretKey
      );

    // Send the token and user data as a response
    res.json({ token, user: { _id: newUser._id, username: newUser.username, email: newUser.email } });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }


    // Send the token and user data as a response
    res.json({  user: { _id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
