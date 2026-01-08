const currentStatus = document.body.getAttribute("data-status");

fetch("http://localhost:5000/tasks")
  .then(res => res.json())
  .then(tasks => {
    const box = document.getElementById("tasks");
    box.innerHTML = "";

    tasks.forEach(t => {
      if (t.status === currentStatus) {
        box.innerHTML += `
          <div class="card">
            <h3>${t.title}</h3>
            <p>📁 ${t.project}</p>
            <p>👤 ${t.assignedTo}</p>
          </div>
        `;
      }
    });
  });
