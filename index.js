import inquirer from 'inquirer'
import mysql from 'mysql2'
import cTable from 'console.table'



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // password: '',
    database: 'employees'
});

connection.connect(function (err) {
    if (err) throw err;
});



// THEN I am presented with the following options: View all departments, View all role, View all employees, Add a department, Add a role, Add an employee, and update an employee role


let appMenu = [
    {
        type: "list",
        name: "initial",
        message: "What would you like to do?",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit"]
    }
]

let init = () => {
    inquirer.prompt(appMenu)
        .then((answer) => {
            switch (answer.initial) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
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
                    updateRole();
                    break;
                case "Quit":
                    connection.end()
                    console.log('Bye');
                    break;
            };
        });
};


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
    const addDept = [
        {
            type: "input",
            name: "addDept",
            message: "What is the name of the department?",
        }
    ]

    inquirer.prompt(addDept)
        .then((answer) => {
            const query = `INSERT INTO department (name)
    VALUES (?)`;
            connection.query(query, [answer.addDept], (err, res) => {
                if (err) throw err;
                console.log(`Success! ${answer.addDept} has been added to your table of departments!`)
                init();
            })
        })
}

let addRole = () => {
    const addRole = [
        {
            type: "input",
            name: "role",
            message: "What is the name of the role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?"
        },

        {
            type: "input",
            name: "dept",
            message: "What is the id of the department? (View departments to check their id)"
        }

    ]

    inquirer.prompt(addRole)
        .then((answer) => {
            const query = `
            INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            connection.query(query, [answer.role, answer.salary, answer.dept], (err, res) => {

                console.log(`Success! ${answer.role} has been added to your table of roles!`)

                init()

            })
        })
}

let addEmployee = () => {
    const addEmp = [
        {
            type: "input",
            name: "firstN",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastN",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name: "role",
            message: "What is the employee's role ID? (View roles to check for role id)"
        },
        {
            type: "input",
            name: "manager",
            message: "What's the employee's manager ID?"
        }
    ]
    inquirer.prompt(addEmp)
        .then((answer) => {
            const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

            connection.query(query, [answer.firstN, answer.lastN, answer.role, answer.manager], (err, res) => {
                console.log(`Success! ${answer.firstN} ${answer.lastName} has been added to your table of employees!`)
                console.table(res)

                init()
            })
        })
}

    const updateRole = () => {
        //get all the employee list 
        connection.query("SELECT * FROM EMPLOYEE", (err, emplRes) => {
          if (err) throw err;
          const employeeChoice = [];
          emplRes.forEach(({ first_name, last_name, id }) => {
            employeeChoice.push({
              name: first_name + " " + last_name,
              value: id
            });
          });
          
          //get all the role list to make choice of employee's role
          connection.query("SELECT * FROM ROLE", (err, rolRes) => {
            if (err) throw err;
            const roleChoice = [];
            rolRes.forEach(({ title, id }) => {
              roleChoice.push({
                name: title,
                value: id
                });
              });
           
            let questions = [
              {
                type: "list",
                name: "id",
                choices: employeeChoice,
                message: "whose role do you want to update?"
              },
              {
                type: "list",
                name: "role_id",
                choices: roleChoice,
                message: "what is the employee's new role?"
              }
            ]
        
            inquirer.prompt(questions)
              .then(response => {
                const query = `UPDATE EMPLOYEE SET ? WHERE ?? = ?;`;
                connection.query(query, [
                  {role_id: response.role_id},
                  "id",
                  response.id
                ], (err, res) => {
                  if (err) throw err;
                  
                  console.log("successfully updated employee's role!");
                  init();
                });
              })
              .catch(err => {
                console.error(err);
              });
            })
        });
      }

init();
