-- generic user table

CREATE TABLE users
(
    user_id INT NOT NULL GENERATED ALWAYS AS IDENTITY,

    -- can be admin, parent, teacher, or student
    account_type VARCHAR(255) NOT NULL,

    last_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    birthday  DATE NOT NULL,

    address VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,

    avatar BYTEA,

    PRIMARY KEY (user_id)
);
