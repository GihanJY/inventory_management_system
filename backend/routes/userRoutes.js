const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../models/user");
const { default: mongoose } = require("mongoose");

const router = express.Router();

// User login
router.post('/loginUser', async (req, res) => {
    try {
        const { email, password } = req.body;

        const loginUser = await Users.findOne({ email });

        if (!loginUser) {
            return res.status(404).json({ message: "Email not found!"});
        }

        const isPasswordValid = await bcrypt.compare(password, loginUser.password);

        if (isPasswordValid) {
            return res.status(200).json({ message: "User login successfully."});
        }
        else {
            return res.status(401).json({ message: "Wrong password!"});
        }
    }
    catch (error) {
        console.error(`Login failed!. Error: ${error}`);
        res.status(500).json({ error: "Failed to login!"});
    }
});

// CRUD Operations
// ==============================
// Create a user(Register a user)
router.post("/registerUser", async (req, res) => {
  try {
    const { name, email, password, telephone, role } = req.body;

    if (!name || !email || !password || !telephone || !role) {
      return res.status(400).json({ error: "All field required!" });
    };

    const existingUser = await Users.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ error: "Email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      name,
      email,
      password: hashedPassword,
      telephone,
      role,
    });

    await newUser.save();
    res.status(200).json({ message: "User added successfully." });
  } catch (error) {
    console.error(`User insertion failed!. Error: ${error}`);
    res.status(500).json({ error: "Add new user failed!" });
  }
});

// Get all users
router.get("/getUsers", async (req, res) => {
  try {
    const users = await Users.find();
    res
      .status(200)
      .json({ message: "Users returned successfully.", users: users });
  } catch (error) {
    console.error(`User return failed!. Error: ${error}`);
    res.status(500).json({ error: "Failed to retrieve users!" });
  }
});

// Get a user
router.get("/getUser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const userId = new mongoose.Types.ObjectId(id);

    const user = await Users.findOne({ _id: userId });

    if (user) {
      res
        .status(200)
        .json({ message: "User returned successfully.", user: user });
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    console.error(`User return failed!. Error: ${error}`);
    res.status(500).json({ error: "User not found!" });
  }
});

// Update a user
router.put("/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, telephone, role } = req.body;

    const updateUser = await Users.findByIdAndUpdate(
      id,
      { name, email, password, telephone, role },
      { new: true, runValidators: true }
    );

    if (!updateUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({
        message: "User updated successfully",
        user: updateUser
    });
  } catch (error) {
    console.error(`User update failed. Error: ${error}`);
    res.status(500).json({ error: "Failed to update item!" });
  }
});

// Delete a user
router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const { id } = req.params;
    
    const deleteUser = await Users.findByIdAndDelete(id);

    if (!deleteUser) {
        return res.status(404).json({ message: "User not found!"});
    }

    res.status(200).json({ message: "User deleted successfully."});
    }
    catch (error) {
        console.error(`User deletion failed! Error: ${error}`);
        res.status(500).json({ error: "Failed to delete user!"});
    }
});

module.exports = router;
