let currentUser = "";

function login() {
  currentUser = username.value;
  fetch("/login", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ username: currentUser })
  });
  document.querySelector(".login").classList.add("hidden");
  document.querySelector(".app").classList.remove("hidden");
  welcome.innerText = "👋 Welcome " + currentUser;
  loadPosts();
}

function follow() {
  fetch("/follow", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      user: currentUser,
      target: followUser.value
    })
  });
}

function createPost() {
  fetch("/post", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      user: currentUser,
      text: postText.value
    })
  })
  .then(res => res.json())
  .then(renderPosts);
}

function likePost(i) {
  fetch("/like", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ index: i })
  })
  .then(res => res.json())
  .then(renderPosts);
}

function addComment(i) {
  const text = document.getElementById("c"+i).value;
  fetch("/comment", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      index: i,
      comment: text,
      user: currentUser
    })
  })
  .then(res => res.json())
  .then(renderPosts);
}

function loadPosts() {
  fetch("/posts")
    .then(res => res.json())
    .then(renderPosts);
}

function renderPosts(posts) {
  let html = "";
  posts.forEach((p,i)=>{
    html += `
    <div class="post">
      <b>${p.user}</b><br>${p.text}<br>
      ❤️ ${p.likes}
      <button onclick="likePost(${i})">Like</button>
      <input id="c${i}" placeholder="Comment">
      <button onclick="addComment(${i})">Send</button>
      ${p.comments.map(c=>`<div class="comment">${c}</div>`).join("")}
    </div>`;
  });
  document.getElementById("posts").innerHTML = html;
}
