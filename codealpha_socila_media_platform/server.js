const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));

let users = {};  
let posts = [];

app.post("/login", (req, res) => {
  const { username } = req.body;
  if (!users[username]) {
    users[username] = { followers: [], following: [] };
  }
  res.json({ success: true });
});

app.post("/follow", (req, res) => {
  const { user, target } = req.body;
  if (!users[user].following.includes(target)) {
    users[user].following.push(target);
    users[target].followers.push(user);
  }
  res.json(users);
});

app.post("/post", (req, res) => {
  posts.unshift({
    user: req.body.user,
    text: req.body.text,
    likes: 0,
    comments: []
  });
  res.json(posts);
});

app.post("/like", (req, res) => {
  posts[req.body.index].likes++;
  res.json(posts);
});

app.post("/comment", (req, res) => {
  const { index, comment, user } = req.body;
  posts[index].comments.push(`${user}: ${comment}`);
  res.json(posts);
});

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.listen(3000, () =>
  console.log("🔥 Server running at http://localhost:3000")
);
