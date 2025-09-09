const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("empTable").getElementsByTagName("tbody")[0];
const successMsg = document.getElementById("successEmp"); // fixed ID to match your HTML

let employees = JSON.parse(localStorage.getItem("employees")) || [];

// Load existing employees on page load
employees.forEach((emp, index) => addEmployeeToTable(emp, index));

addBtn.addEventListener("click", function(event) {
  event.preventDefault();

  let name = document.getElementById("empName").value.trim();
  let role = document.getElementById("empRole").value.trim();
  let dept = document.getElementById("empDept").value.trim();
  let phone = document.getElementById("empPhone").value.trim();

  if (name === "") {
    document.getElementById("errorName").innerText = "Employee Name is Required";
    return;
  }
  if (role === "") {
    document.getElementById("errorRole").innerText = "Employee Role is Required";
    return;
  }
  if (dept === "") {
    document.getElementById("errorDept").innerText = "Employee Department is Required";
    return;
  }
  if (phone === "") {
    document.getElementById("errorPhone").innerText = "Employee Phone Number is Required";
    return;
  }

  let newEmp = { name, role, dept, phone };

  employees.push(newEmp);
  localStorage.setItem("employees", JSON.stringify(employees));

  addEmployeeToTable(newEmp, employees.length - 1);

  // reset inputs
  document.getElementById("empName").value = "";
  document.getElementById("empRole").value = "";
  document.getElementById("empDept").value = "";
  document.getElementById("empPhone").value = "";

  // clear errors
  document.getElementById("errorName").innerText = "";
  document.getElementById("errorRole").innerText = "";
  document.getElementById("errorDept").innerText = "";
  document.getElementById("errorPhone").innerText = "";

  // success message
  successMsg.innerText = "Registration successful!";
  setTimeout(() => successMsg.innerText = "", 3000);
});

// Function to add an employee row to the table
function addEmployeeToTable(emp, index) {
  let row = tableBody.insertRow();
  row.insertCell(0).innerText = emp.name;
  row.insertCell(1).innerText = emp.role;
  row.insertCell(2).innerText = emp.dept;
  row.insertCell(3).innerText = emp.phone;

// Add delete button
let deleteCell = row.insertCell(4);
let delBtn = document.createElement("button");
delBtn.innerText = "Delete";
delBtn.classList.add("delete-btn"); // Add a class for CSS
delBtn.onclick = function () {
  deleteEmployee(index);
};
deleteCell.appendChild(delBtn);
}

// Function to delete employee (GLOBAL, not inside addEmployeeToTable)
function deleteEmployee(index) {
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));

  // refresh table
  tableBody.innerHTML = "";
  employees.forEach((emp, i) => addEmployeeToTable(emp, i));
}
