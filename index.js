import inquirer from 'inquirer'
import mysql from 'mysql2'
import cTable from 'console.table'
import { of } from 'rxjs'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employees'
})
// THEN I am presented with the following options: View all departments, View all roles, View all employees, Add a department, Add a role, Add an employee, and update an employee role


let appMenu =[
        {
            type: "list",
            name: "initial",
            message: "What would you like to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
        }
    ]



let init = () => {
    inquirer.prompt(appMenu)
        .then((answer) => {
            if (answer === "View all departments") {
                viewDepartments();
            }
            if (answer === " View all rolls") {
                viewAllRolls()
            }
            if (answer === "View all employees") {
                viewEmployees()
            }
            if (answer === "Add a department") {
                addDepartment()
            }
            if (answer === "Add a role") {
                addRole()
            }
            if (answer === "Add an employee") {
                addEmployee()
            }
            if (answer === "Update an employee role") {
                updateEmpRole()
            }
        })
}


let viewDepartments = () => {
    connection.query(
        `SELECT * FROM department`,
        function (err, results, fields) {
            console.table(results);
            console.log(fields)
        }
    )
    init()

}

init()