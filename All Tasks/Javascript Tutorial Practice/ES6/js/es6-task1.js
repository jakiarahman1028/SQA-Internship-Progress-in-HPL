/* 

1️⃣ Variables & Scope (let, const)

Create a constant appName = "HRMS Portal" and print it.

Create a variable currentUser and change its value twice. Print each time.

Try to reassign a const variable and note what happens.

Write a loop with var and another with let. Print the loop counter outside the loop and see the difference.

*/

const appName = "HRMS Portal";

console.log(`${appName}`);

let currentUser = "HR";

//currentUser = "Manager";
//currentUser = "Admin";

console.log(`${currentUser}`);

const userName = "Admin";

//userName = "Jakia";

//console.log(`${userName}`); // give error

for(var i = 1; i<=10; i++){
  console.log("loop i = ", i); // printed
}

  console.log("Outside loop i = ", i); // printed

for(let j = 1; j<=10; j++){
  console.log("loop j = ", j); //printed
}

  console.log("Outside loop j = ", j); //scope blocked

  

