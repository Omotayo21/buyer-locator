/*const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");

const SECRET_KEY = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(query, [username, hashedPassword], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Username already exists!" });
      }
      return res.status(500).json({ message: "Database error!", error: err });
    }
    res.status(201).json({ message: "User registered successfully!" });
  });
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error!" });

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
   res.status(200).json({
     message: "Login successful!",
     token,
     user: { id: user.id, username: user.username },
   });
  });
};

exports.verifyToken = (req, res, next) => {
 const authHeader = req.header("Authorization");
 const token = authHeader && authHeader.split(" ")[1];


  if (!token) {
    return res.status(401).json({ message: "Access Denied!" });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token!" });
  }
};*/
