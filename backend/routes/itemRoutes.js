const express = require("express");
const Items = require("../models/item");

const router = express.Router();

// CRUD Operations
// ==============================
// Add a new item(Register an item)
router.post("/addItem", async (req, res) => {
  try {
    const { name, quantity, description, category } = req.body;

    if (!name || !quantity || !description || !category) {
        return res.status(404).json({ error: "All fields are required!"});
    };

    const newItem = new Items({
      name,
      quantity,
      description,
      category,
    });

    await newItem.save();
    res.status(200).json({ message: "Item added successfully" });
  } catch (error) {
    console.log("Item insertion failed. Error: ", error);
    res.status(500).json({ error: "Add new item failed!" });
  }
});

// Get all items
router.get("/getItems", async (req, res) => {
  try {
    const items = await Items.find();
    res.status(200).json({
      message: "Items returned successfully.",
      items: items,
    });
  } catch (error) {
    console.log(`Items return failed. Error: ${error}`);
    res.status(500).json({ error: "Failed to retrieve items!" });
  }
});

// Get a single item
router.get("/getItem", async (req, res) => {
  const { name } = req.query;

  try {
    const item = await Items.findOne({ name });

    if (item) {
      res
        .status(200)
        .json({ message: "Item returned successfully.", item: item });
    } else {
      res.status(404).json({ message: "Item not found!" });
    }
  } catch (error) {
    console.error(`Item return failed. Error: ${error}`);
    res.status(500).json({ error: "Failed to retrieve item!"});
  }
});

// Update an item
router.put("/updateItem/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, quantity, description, category } = req.body;

        const updateItem = await Items.findByIdAndUpdate(
            id,
            { name, quantity, description, category },
            { new: true, runValidators: true }
        );

        if (!updateItem) {
            return res.status(404).json({ message: "Item not found!" });
        }

        res.status(200).json({
            message: "Item updated successfully.",
            item: updateItem,
        });
    }
    catch (error) {
        console.error(`Item update failed. Error: ${error}`);
        res.status(500).json({error: "Failed to update item!"});
    }
});

// Delete an item
router.delete("/deleteItem/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleteItem = await Items.findByIdAndDelete(id);

        if (!deleteItem) {
            return res.status(404).json({ message:"Item not found!"});
        }

        res.status(200).json({ message:"Item deleted successfully."});
    }
    catch (error) {
        console.error(`Item deletion failed!. Error: ${error}`);
        res.status(500).json({ error: "Failed to delete item!"});
    }
});

module.exports = router;