// Get the sign-up form element by its ID
const form = document.getElementById("signUp");

// Add an event listener to handle form submission
form.addEventListener("submit", function(event) {
  
  // Prevent the default form submission (page reload)
  event.preventDefault();

  // Clear any previous error or success messages
  document.getElementById("error").innerText = "";
  document.getElementById("success").innerText = "";

  // Get the values entered by the user in the form fields
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value; 

  // Validation: Check if the name field is empty
  if (name === "") {
    document.getElementById("error").innerText = "Name is required";
    return; // Stop further execution
  }

  // Validation: Check if the email format contains "@" and "."
  else if (!email.includes("@") || !email.includes(".")) {
    document.getElementById("error").innerText = "Invalid email address";
    return; // Stop further execution
  }

  // Validation: Check if the password is at least 6 characters
  else if (password.length < 6) {
    document.getElementById("error").innerText = "Password must be at least 6 characters";
    return; // Stop further execution
  }

  // Validation: Check if the password and confirm password match
  else if (password !== confirmPassword) {
    document.getElementById("error").innerText = "Passwords do not match";
    return; // Stop further execution
  }

  // Get existing users from localStorage or start with empty array
  else {
    let users = JSON.parse(localStorage.getItem("users"))  || []; //JSON.parse = String to Object

  //create new user object
  let newUser = {name,email,password};

  // Add the new user to the users array
  users.push(newUser);

  
  // Save updated users array back to localStorage
  localStorage.setItem("users", JSON.stringify(users)); //JSON.stringify = Object to String

  document.getElementById("success").innerText = "Registration successful!";
    
  //Reset the form
  form.reset();

//users = JSON.parse(localStorage.getItem("users"));
console.log(users);

  }

});

