const express = require("express");
const router = express.Router();
const uuid = require("uuid");
let users = require("../../Users");

// Get all users
router.get("/", (req, res) => {
  res.json(users);
});

//get by id
router.get("/:id", (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));
  if (found) {
    res.json(users.filter((user) => user.id === parseInt(req.params.id)));
  } else {
    res.sendStatus(400);
  }
});

router.post("/", (req, res) => {
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
  };
  if (!newUser.name || !newUser.email) {
    return res.sendStatus(400);
  }
  users.push(newUser);
  res.json(users);
});

// Update user
router.put("/:id", (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    const updateUser = req.body;
    users.forEach((user) => {
      if (user.id === parseInt(req.params.id)) {
        user.name = updateUser.name ? updateUser.name : user.name;
        user.email = updateUser.email ? updateUser.email : user.email;

        return res.json({ msg: "User updated successfully", user });
      }
    });
  } else {
    res.status(404).json({ msg: "User not found" });
  }
});

// Delete user
router.delete("/:id", (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    users = users.filter((user) => user.id !== parseInt(req.params.id));
    res.json({ msg: "User deleted successfully", users });
  } else {
    res.status(404).json({ msg: "User not found" });
  }
});

module.exports = router;
