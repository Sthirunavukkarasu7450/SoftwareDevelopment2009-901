CREATE TABLE users (
    id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (id),

    -- can be admin, parent, teacher, or student
    accountType VARCHAR(255) NOT NULL,

    email VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
