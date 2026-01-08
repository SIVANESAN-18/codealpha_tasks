function addTask() {
  const task = {
    project: project.value,
    title: title.value,
    assignedTo: assigned.value,
    status: status.value
  };

  fetch("http://localhost:5000/task", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  })
  .then(() => alert("Task added"));
}

function go(page) {
  location.href = page;
}
