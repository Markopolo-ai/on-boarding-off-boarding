const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors());

const users = {};

app.post("/users", async (req, res) => {
  try {
    const id = Math.random().toString(36).substring(2);
    const { name, email, avatar } = req.body;
    const user = { id, name, email, avatar };
    users[id] = user;

    await axios.post("http://localhost:8888/.netlify/functions/event-bus", {
      type: "UserCreated",
      data: users[id],
    });
    res.status(201).json(users[id]);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/events", (req, res) => {
  console.log("Event type", req.body.type);
  res.json({ msg: "Event bus called me" });
});

app.listen(PORT, () => {
  console.log(`Users app is running on port ${PORT}`);
});
