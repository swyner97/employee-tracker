import inquirer from 'inquirer'
import { of } from 'rxjs'


// THEN I am presented with the following options: View all departments, View all roles, View all employees, Add a department, Add a role, Add an employee, and update an employee role


let appMenu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "initial",
            message: "What would you like to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
        }
    ])
}

let init = () => {
    inquirer.prompt(appMenu)
        .then((answer) => {
            const { choices } = answer;
            if (choices === "View all departments") {
                viewAllDepartments();
            }
            if (choices === " View all rolls") {
                viewAllRolls()
            }
            if (choices === "View all employees") {
                viewAllEmployees()
            }
            if (choices === "Add a department") {
                addADepartment()
            }
            if (choices === "Add a role") {
                addARole()
            }
            if (choices === "Add an employee") {
                addAnEmployee()
            }
            if (choices === "Update an employee role") {
                updateEmpRole()
            }
        })
}


let viewAllDepartments = () => {
    
}