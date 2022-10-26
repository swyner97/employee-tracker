INSERT INTO department(id, name) 
VALUES 
(1, 'Customer Service'),
(2, 'Markerting');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Customer Service Manager', 130000, 1),
('Customer Service Rep', 45000, 1),
('Marketing Manager', 140000, 2),
('Marketing Specialist', 1000000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Max', 'Mayfield', 1, NULL),
('Eddie', 'Munson', 2, NULL),
('Billy', 'Hargrove', 2, 1),
('Steve', 'Harrington', 1, 2),
('Robin', 'Buckley', 1, 1),
('Lucas', 'Sinclair', 1, 2),
('Nancy', 'Wheeler', 2, 2);