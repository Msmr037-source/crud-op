const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/crudDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Model
const User = mongoose.model("User", {
  name: String,
  email: String
});

// CREATE
app.post("/add", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User Added");
});

// READ
app.get("/users", async (req, res) => {
  const data = await User.find();
  res.json(data);
});

// DELETE
app.delete("/delete/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

// UPDATE (optional)
app.put("/update/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.send("Updated");
});

// Start server
app.listen(3000, () => console.log("Server running at http://localhost:3000"));