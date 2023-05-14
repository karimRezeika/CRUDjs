const url = "http://localhost:3000";

window.onload = async () => {
  await getData();
};

async function getData() {
  const records = await fetch("http://localhost:3000/persons");
  const data = await records.json();
  console.log(data);
  let tab = "";
  data.forEach(function (user) {
    tab += `<tr>
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.age}</td>
    <td>${user.gender}</td>
    <td>${user.email}</td>
    <td><button class="btn btn-danger btn-sm" onclick="deleteRecord(${user.id})">Delete</button>
    <button class="btn btn-warning btn-sm" onclick="updateUser(${user.id})">Update</button>
    </td>
    </tr>`;
  });

  document.getElementById("tbody").innerHTML = tab;
  $("userstable").DataTable({
    data: data.users,
    columns: [
      { data: "id" },
      { data: "name" },
      { data: "age" },
      { data: "gender" },
      { data: "email" },
    ],
  });
}
async function addPerson() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value;
  const person = {
    name: name,
    age: age,
    gender: gender,
    email: email,
  };

  const response = await fetch("http://localhost:3000/persons", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });  

   getData();
  document.getElementById("form").style.display = "none";
}

async function deleteRecord(recordId) {
  console.log("del person with id ", recordId);
  await fetch(`http://localhost:3000/persons/${recordId}`, {
    method: "DELETE",
  });

  await getData();
}

async function updateUser(recordId) {
  console.log("update person with id ", recordId);
  await fetch(`http://localhost:3000/persons/${recordId}`, {
    method: "PUT",
  });

  await getData();
}

Form = document.getElementById("form");
function show_table() {
  form.style.display = "flex";
}

//  async function updateUser(recordId) {
//   console.log('Update person with id', recordId);
//   await fetch(`${url}/persons/${recordId}`, {
//   method: 'PUT'
//   });

//   await getData();
//   }

async function updateUser(recordId) {
  console.log("update person with id ", recordId);

  // Get the user details from the server
  const response = await fetch(`http://localhost:3000/persons/${recordId}`);
  const user = await response.json();

  // Fill the form with the user details
  document.getElementById("name").value = user.name;
  document.getElementById("age").value = user.age;
  document.getElementById("gender").value = user.gender;
  document.getElementById("email").value = user.email;

  // Show the form for updating the user
  document.getElementById("form").style.display = "flex";
  document.getElementById("updateBtn").style.display = "inline";

  // Update the user on the server when the form is submitted
  const updateBtnBlue = document.getElementById("updateBtn");
  updateBtnBlue.onclick = async (event) => {
    event.preventDefault();
    const id = recordId;
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const email = document.getElementById("email").value;
    const updatedUser = { id, name, age, gender, email };
    console.log(updatedUser);

    await fetch(`http://localhost:3000/persons/${recordId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    await getData();
    document.getElementById("form").style.display = "none";
  };
}



