import inquirer from 'inquirer'
import mysql from 'mysql2'
import cTable from 'console.table'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employees'
})

// THEN I am presented with the following options: View all departments, View all role, View all employees, Add a department, Add a role, Add an employee, and update an employee role


let appMenu = [
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
            switch (answer.initial) {
                case 'View all departments':
                    console.log('this works!')
                    break;
                case 'View all role':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmprole();
                    break;
            }
        })
}


let viewDepartments = () => {
    connection.query(
        `SELECT * FROM department`,
        function (err, results, fields) {
            console.table(results);
             init()
        }
    )
}


let viewAllRoles = () => {
    connection.query(
        `SELECT title, salary FROM role`,
        function (err, results, fields) {
            console.table(results);
            init()
        }
    )
}

let viewEmployees = () => {
    connection.query(
       `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
       CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee 
       LEFT JOIN role on role.id = employee.role_id 
       LEFT JOIN department on department.id = role.department_id
       LEFT JOIN employee manager on manager.id = employee.manager_id;
        `,
        function (err, results, fields) {
            console.table(results)
            init();
        }
    )
}

let addDepartment = () => {
connection.query(
    `INSERT INTO department SET ?`,
    function (err, results, fields) {
        console.table(results)
        init();
    }
)}

init();