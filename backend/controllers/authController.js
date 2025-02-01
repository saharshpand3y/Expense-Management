import User from "../models/User.js";
import { generateToken, generateRefreshToken } from "../utils/jwtUtils.js";

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ firstName, lastName, email, password });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, firstName, lastName, email },
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(password); 
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("token", token, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    res.json({
      message: "Logged in successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "An error occurred during login" });
  }
};

export const getLoggedInUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    res.status(500).json({ message: "Failed to fetch user details" });
  }
};
