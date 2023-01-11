CREATE TABLE courses
(
    course_id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
    course_name VARCHAR(255) NOT NULL,

    teacher_id INT NOT NULL,
    student_ids INT[] NOT NULL,
    student_grades JSONB NOT NULL,

    PRIMARY KEY (course_id),
    FOREIGN KEY (teacher_id) REFERENCES users(user_id)
);
