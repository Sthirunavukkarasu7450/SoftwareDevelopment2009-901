CREATE TABLE teachers
(
    teacher_id INT NOT NULL,

    schedule BYTEA,

    FOREIGN KEY (teacher_id) REFERENCES users(user_id)
);
