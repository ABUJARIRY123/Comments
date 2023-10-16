const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 4000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost/authdb", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Check MongoDB connection
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Define User Schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String, // Store the hashed and salted password
    username: String
});

const users = mongoose.model("User", userSchema);

app.get("/api", (req, res) => {
    res.json({
        message: "The server side",
    });
});

app.post("/api/register", async (req, res) => {
    const { email, password, username } = req.body;
    console.log("Received request with email:", email);

    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).json({ error: "Email already registered." });
    }

    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
        email,
        password: hashedPassword,
        username
    });

    // Save the new user to the database
    newUser.save((err) => {
        if (err) {
            console.error("Error saving user:", err);
            res.status(500).json({ error: "Failed to register user." });
        } else {
            console.log("User saved successfully.");
            res.status(201).json({ message: "User registered successfully." });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
