CREATE TABLE students
(
    student_id INT NOT NULL,

    grade INT NOT NULL,
    grade_principal_id INT NOT NULL,
    counselor_id INT NOT NULL,

    homeroom_teacher_id INT,
    course_ids INT[],

    schedule BYTEA,
    portfolio BYTEA,

    FOREIGN KEY (student_id) REFERENCES users(user_id),
    FOREIGN KEY (grade_principal_id) REFERENCES users(user_id),
    FOREIGN KEY (counselor_id) REFERENCES users(user_id),
    FOREIGN KEY (homeroom_teacher_id) REFERENCES users(user_id)
);
