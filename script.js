let users = JSON.parse(localStorage.getItem('users')) || [];

document.getElementById('userForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const age = parseInt(document.getElementById('age').value);
  const phone = document.getElementById('phone').value.trim();
  const phoneRegex = /^\d{10}$/;

  if (name && age && phoneRegex.test(phone)) {
    const user = { name, age, phone };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    renderTable(users);
    this.reset();
  } else {
    alert("Please enter valid details. Phone must be a 10-digit number.");
  }
});

function renderTable(data) {
  const tbody = document.getElementById('userTableBody');
  tbody.innerHTML = '';

  data.map((user, index) => {
    const row = `<tr>
      <td>${index + 1}</td>
      <td>${user.name}</td>
      <td>${user.age}</td>
      <td>${user.phone}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function sortByAge() {
  const sorted = [...users].sort((a, b) => a.age - b.age);
  renderTable(sorted);
}

function filterAdults() {
  const filtered = users.filter(user => user.age >= 18);
  renderTable(filtered);
}

function resetFilter() {
  renderTable(users);
}

function clearAll() {
  if (confirm("Are you sure you want to delete all users?")) {
    users = [];
    localStorage.removeItem('users');
    renderTable(users);
  }
}

// Initial render
renderTable(users);
