import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw new Error("Token generation failed");
  }
};

export const generateRefreshToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  } catch (error) {
    console.error("Error generating refresh token:", error.message);
    throw new Error("Refresh token generation failed");
  }
};
