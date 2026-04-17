const API = "http://localhost:3000";

// READ
async function loadUsers() {
  const res = await fetch(API + "/users");
  const users = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  users.forEach(u => {
    list.innerHTML += `
      <li>
        ${u.name} - ${u.email}
        <button onclick="deleteUser('${u._id}')">Delete</button>
      </li>
    `;
  });
}

// CREATE
async function addUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  await fetch(API + "/add", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name, email })
  });

  // clear input
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";

  loadUsers();
}

// DELETE
async function deleteUser(id) {
  await fetch(API + "/delete/" + id, {
    method: "DELETE"
  });

  loadUsers();
}

// Load data on start
loadUsers();
