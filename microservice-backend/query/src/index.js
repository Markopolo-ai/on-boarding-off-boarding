const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5002;

app.use(express.json());
app.use(cors());

const users_access = {};

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "UserCreated") {
    const { id, name, email, avatar } = data;
    users_access[id] = { userId: id, name, email, avatar };
  }
  if (type === "AppAcessCreated") {
    const { userId, access, trelloMemberId } = data;
    users_access[userId].access = access;
    users_access[userId].trelloMemberId = trelloMemberId;
  }
  if (type === "AppAcessUpdated") {
    const { userId, access } = data;
    users_access[userId].access = access;
  }
  res.json({ msg: "Query called!" });
});

app.get("/users_access", (req, res) => {
  res.json(users_access);
});

app.listen(PORT, () => {
  console.log(`Users app is running on port ${PORT}`);
});
