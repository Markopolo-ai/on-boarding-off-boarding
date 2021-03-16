const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const apps = {};

const toggleTrelloBoardAccess = async (memberId, access) => {
  try {
    if (access) {
      return await axios.put(
        `https://api.trello.com/1/boards/${process.env.TRELLO_BOARD_ID}/members/${memberId}?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_ACCESS_TOKEN}&type=normal`
      );
    }
    return await axios.delete(
      `https://api.trello.com/1/boards/${process.env.TRELLO_BOARD_ID}/members/${memberId}?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_ACCESS_TOKEN}&type=normal`
    );
  } catch (error) {
    return error;
  }
};

app.post("/users/apps", async (req, res) => {
  const id = Math.random().toString(36).substring(2);
  const { access, userId, trelloMemberId } = req.body;
  const app = { id, access, trelloMemberId };
  apps[userId] = app;
  await axios.post("http://localhost:8888/.netlify/functions/event-bus", {
    type: "AppAcessCreated",
    data: { userId, access, trelloMemberId },
  });
  const response = await toggleTrelloBoardAccess(trelloMemberId, access);
  res.json(apps[userId]);
});

app.patch("/users/apps", async (req, res) => {
  try {
    const { access, userId, trelloMemberId } = req.body;
    apps[userId].access = access;

    await axios.post("http://localhost:8888/.netlify/functions/event-bus", {
      type: "AppAcessUpdated",
      data: { userId, access, trelloMemberId },
    });
    toggleTrelloBoardAccess(trelloMemberId, access);
    res.json(apps[userId]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
});

app.get("/users/apps", (req, res) => {
  const { userId } = req.query;

  res.json(apps[userId]);
});

app.post("/events", (req, res) => {
  console.log("Event type", req.body.type);
  res.json({ msg: "Event bus called me" });
});

app.listen(PORT, () => {
  console.log(`Users app is running on port ${PORT}`);
});
