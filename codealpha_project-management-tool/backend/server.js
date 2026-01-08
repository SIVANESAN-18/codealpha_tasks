const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

app.post("/task", (req, res) => {
  tasks.push(req.body);
  console.log(tasks); // DEBUG
  res.json({ success: true });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
