CREATE TABLE teachers
(
    teacher_id INT NOT NULL,

    course_ids INT[],
    schedule BYTEA,

    FOREIGN KEY (teacher_id) REFERENCES users(user_id)
);
