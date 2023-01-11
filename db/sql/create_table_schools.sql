CREATE TABLE schools
(
    school_id INT NOT NULL GENERATED ALWAYS AS IDENTITY,

    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    principal_id INT NOT NULL,

    PRIMARY KEY (school_id)
);
