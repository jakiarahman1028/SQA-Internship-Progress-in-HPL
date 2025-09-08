const addBtn = document.getElementById("addBtn");

const tableBody = document.getElementById("empTable").getElementsByTagName("tbody")[0];

const successMsg = document.getElementById("successMsg");

let employees = JSON.parse(localStorage.getItem("employees")) || [];

addBtn.addEventListener("click",function()
{

let name = document.getElementById("empName").value;
let role = document.getElementById("empRole").value;
let dept = document.getElementById("empDept").value;
let phone = document.getElementById("empPhone").value;

if(name === ""){
  document.getElementById("errorName").innerText = "Employee Name is Required";
  return;
}

else if(role === ""){
  document.getElementById("errorRole").innerText = "Employee Role is Required";
  return;
}

else if(dept === ""){
  document.getElementById("errorDept").innerText = "Employee Department is Required";
  return;
}

else if(phone === ""){
  document.getElementById("errorPhone").innerText = "Employee Phone Number is Required";
  return;
}

let newEmp = {name, role, dept, phone};

employees.push(newEmp);

localStorage.setItem("employees", JSON.stringify(employees));

addEmployeeToTable(newEmp);

document.getElementById("empName").value ="";
document.getElementById("empRole").value = "";
document.getElementById("empDept").value = "";
document.getElementById("empPhone").value = "";


});

// Function to add an employee row to the table
function addEmployeeToTable(emp){
  let row = tableBody.insertRow();       
  row.insertCell(0).innerText = emp.name;  // Add employee name to first cell
  row.insertCell(1).innerText = emp.role;  // Add employee role to second cell
  row.insertCell(2).innerText = emp.dept;  // Add employee department to third cell
  row.insertCell(3).innerText = emp.phone; // Add employee phone to fourth cell
}

