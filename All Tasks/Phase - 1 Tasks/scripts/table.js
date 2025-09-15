const addBtn = document.getElementById("addBtn");
// "Add Employee" button

const tableBody = document
  .getElementById("empTable")
  .getElementsByTagName("tbody")[0];
// <tbody> of the employee table where new rows will be added

const successMsg = document.getElementById("successEmp");
// <div> or <span> to show success messages after adding an employee

// Load previously saved employees from localStorage
// If there are none, start with an empty list
let employees = JSON.parse(localStorage.getItem("employees")) || [];

// When the page loads, immediately display all stored employees in the table
employees.forEach((emp, index) => addEmployeeToTable(emp, index));

// ADD NEW EMPLOYEE
addBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Prevents the default behavior - refreshing the page when the button is clicked

  // Collect values from the input fields
  let name = document.getElementById("empName").value;
  let role = document.getElementById("empRole").value;
  let dept = document.getElementById("empDept").value;
  let phone = document.getElementById("empPhone").value;

  // Input Validations
  // Check if each field is filled in; if not, show an error and stop here
  if (name === "") {
    document.getElementById("errorName").innerText =
      "Employee Name is Required";
    return;
  }
  if (role === "") {
    document.getElementById("errorRole").innerText =
      "Employee Role is Required";
    return;
  }
  if (dept === "") {
    document.getElementById("errorDept").innerText =
      "Employee Department is Required";
    return;
  }
  if (phone === "") {
    document.getElementById("errorPhone").innerText =
      "Employee Phone Number is Required";
    return;
  }

  // Create a new employee object with the entered details
  let newEmp = { name, role, dept, phone };

  // Save this employee in the array
  employees.push(newEmp); //newwmp -> employees

  // Update localStorage so data doesn’t disappear when page refreshes
  localStorage.setItem("employees", JSON.stringify(employees)); // save employees to localstorage

  // Add the new employee to the visible table immediately
  addEmployeeToTable(newEmp, employees.length - 1);

  // Reset input fields for the next entry
  document.getElementById("empName").value = "";
  document.getElementById("empRole").value = "";
  document.getElementById("empDept").value = "";
  document.getElementById("empPhone").value = "";

  // Clear error messages after successful entry
  document.getElementById("errorName").innerText = "";
  document.getElementById("errorRole").innerText = "";
  document.getElementById("errorDept").innerText = "";
  document.getElementById("errorPhone").innerText = "";

  // Show success message for 3 seconds
  successMsg.innerText = "Registration successful!";
  setTimeout(() => (successMsg.innerText = ""), 3000);
});

// DISPLAY EMPLOYEE IN TABLE

// Function to add one employee row to the table
function addEmployeeToTable(emp, index) {
  let row = tableBody.insertRow(); // Create a new row

  // Insert the employee data into the row cells
  row.insertCell(0).innerText = emp.name;
  row.insertCell(1).innerText = emp.role;
  row.insertCell(2).innerText = emp.dept;
  row.insertCell(3).innerText = emp.phone;

  // Add a Delete button for each row
  let deleteCell = row.insertCell(4);
  let delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.classList.add("delete-btn"); // Add a class so we can style it with CSS
  delBtn.onclick = function () {
    deleteEmployee(index); // When clicked, call deleteEmployee() for this row
  };
  deleteCell.appendChild(delBtn);
}

// DELETE EMPLOYEE

// Function to remove an employee from the list and refresh the table
function deleteEmployee(index) {
  // Remove that employee from the array
  employees.splice(index, 1);

  // Save the updated list in localStorage
  localStorage.setItem("employees", JSON.stringify(employees));

  // Clear the table body and rebuild it from the updated employee list
  tableBody.innerHTML = "";
  employees.forEach((emp, i) => addEmployeeToTable(emp, i));
}
