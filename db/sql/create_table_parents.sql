CREATE TABLE parents
(
    parent_id INT NOT NULL,

    children_ids INT[] NOT NULL,

    FOREIGN KEY (parent_id) REFERENCES users(user_id)
);
