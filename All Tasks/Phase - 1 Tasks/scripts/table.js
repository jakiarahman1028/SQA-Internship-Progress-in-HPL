// Arrays for dropdown values (global scope)
const roles = ["Manager", "Executive", "Senior Executive", "HR", "Intern"];
const depts = ["MIS", "General", "Supply Chain", "Commercial", "SMD"];

const addBtn = document.getElementById("addBtn");
const tableBody = document
  .getElementById("empTable")
  .getElementsByTagName("tbody")[0];
const successMsg = document.getElementById("successEmp");

// Load employees from localStorage or start empty
let employees = JSON.parse(localStorage.getItem("employees")) || [];

// Load last used ID from localStorage or start from 0
let lastId = parseInt(localStorage.getItem("lastEmpId")) || 0;

// Display existing employees on page load
employees.forEach((emp, index) => addEmployeeToTable(emp, index));

// ADD NEW EMPLOYEE
addBtn.addEventListener("click", function (event) {
  event.preventDefault();

  let name = document.getElementById("empName").value.trim();
  let role = document.getElementById("empRole").value;
  let dept = document.getElementById("empDept").value;
  let phone = document.getElementById("empPhone").value.trim();
   const phoneRegex = /^\+8801\d{9}$/ ;

  // Input Validations
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

  else if(!phoneRegex.test(phone)){
    document.getElementById("errorPhone").innerText = "Phone number must be in the format +8801XXXXXXXXX";
    return;
  }

  // Increment last ID and save to localStorage
  lastId++;
  let empId = "EMP" + lastId;
  localStorage.setItem("lastEmpId", lastId);

  // Create new employee object
  let newEmp = {
    id: empId,  // auto-generated ID
    name,
    role,
    dept,
    phone
  };

  // Save in array + localStorage
  employees.push(newEmp);
  localStorage.setItem("employees", JSON.stringify(employees));

  // Display in table
  addEmployeeToTable(newEmp, employees.length - 1);

  // Reset inputs
  document.getElementById("empName").value = "";
  document.getElementById("empRole").value = "";
  document.getElementById("empDept").value = "";
  document.getElementById("empPhone").value = "";

  // Clear errors
  document.getElementById("errorName").innerText = "";
  document.getElementById("errorRole").innerText = "";
  document.getElementById("errorDept").innerText = "";
  document.getElementById("errorPhone").innerText = "";

  // Success message
  successMsg.innerText = "New Employee Added successfully !";
  setTimeout(() => (successMsg.innerText = ""), 3000);
});

// DISPLAY EMPLOYEE IN TABLE
function addEmployeeToTable(emp, index) {
  let row = tableBody.insertRow();

  row.insertCell(0).innerText = emp.id;   // ID column
  row.insertCell(1).innerText = emp.name;
  row.insertCell(2).innerText = emp.role;
  row.insertCell(3).innerText = emp.dept;
  row.insertCell(4).innerText = emp.phone;

  // Delete button
  let deleteCell = row.insertCell(5);
  let delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.classList.add("delete-btn");
  delBtn.onclick = function () {
    showConfirm(
      `Are you sure you want to delete ${emp.name}?`,
      function (confirmDelete) {
        if (confirmDelete) {
          deleteEmployee(index);
        }
      }
    );
  };
  deleteCell.appendChild(delBtn);
}

// GENERATE DROPDOWN
function generateDropdown(dropdownId, optionArray) {
  const dropdown = document.getElementById(dropdownId);
  optionArray.forEach((optionValue) => {
    const option = document.createElement("option");
    option.value = optionValue;
    option.text = optionValue;
    dropdown.appendChild(option);
  });
}

generateDropdown("empRole", roles);
generateDropdown("empDept", depts);

// DELETE EMPLOYEE
function deleteEmployee(index) {
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));

  tableBody.innerHTML = "";
  employees.forEach((emp, i) => addEmployeeToTable(emp, i));

  successMsg.innerText = "Employee Deleted Successfully !";
  setTimeout(() => (successMsg.innerText = ""), 3000);

}

// CONFIRMATION BOX
function showConfirm(message, callback) {
  const confirmBox = document.getElementById("confirmBox");
  const confirmMessage = document.getElementById("confirmMessage");
  const yesBtn = document.getElementById("confirmYes");
  const noBtn = document.getElementById("confirmNo");

  confirmMessage.innerText = message;
  confirmBox.style.display = "flex";

  yesBtn.onclick = () => {
    confirmBox.style.display = "none";
    callback(true);
  };
  noBtn.onclick = () => {
    confirmBox.style.display = "none";
    callback(false);
  };
}
