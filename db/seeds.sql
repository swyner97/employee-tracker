INSERT INTO
    department(id, name)
VALUES
    (1, 'Customer Service'),
    (2, 'Markerting');

INSERT INTO
    role (title, salary, department_id)
VALUES
    ('Customer Service Manager', 130000, 1),
    ('Customer Service Rep', 45000, 1),
    ('Marketing Manager', 140000, 2),
    ('Marketing Specialist', 1000000, 2);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Max', 'Mayfield', 1, NULL),
    ('Eddie', 'Munson', 3, NULL),
    ('Billy', 'Hargrove',4 ,3 ),
    ('Steve', 'Harrington', 1, 2),
    ('Robin', 'Buckley', 1, 2),
    ('Lucas', 'Sinclair', 1, 2),
    ('Nancy', 'Wheeler', 4, 3);