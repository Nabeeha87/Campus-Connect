const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const JWT_SECRET = "secretkey"; // Keep this secret
const users = []; // Mock database

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend"))); // Serve frontend

// Signup Route
app.post("/api/signup", async (req, res) => {
  const { email, password, accountType } = req.body;

  if (!email || !password || !accountType) {
    return res.status(400).send("Missing required fields");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword, accountType });
  res.status(201).send("User Registered");
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).send("Invalid Credentials");
  }
});

// Start the Server
app.listen(5000, () => console.log("Server running on port 5000"));
