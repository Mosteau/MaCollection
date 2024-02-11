DROP TABLE IF EXISTS `user`;

DROP TABLE IF EXISTS `games`;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY, lastname VARCHAR(50) NOT NULL, firstname VARCHAR(50) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL
);

INSERT INTO
    user (
        lastname, firstname, email, password
    )
VALUES (
        'Dupont', 'Pierre', 'pierre.dupont@email.com', 'motdepasse123'
    ),
    (
        'Martin', 'Sophie', 'sophie.martin@email.com', 'secret456'
    ),
    (
        'Lefevre', 'Jean', 'jean.lefevre@email.com', 'secure789'
    ),
    (
        'Dufour', 'Marie', 'marie.dufour@email.com', 'mdp12345'
    ),
    (
        'Leroy', 'Luc', 'luc.leroy@email.com', 'password678'
    );

CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, name VARCHAR(100) NOT NULL, genre VARCHAR(100) NOT NULL, platform VARCHAR(100) NOT NULL, date DATE, FOREIGN KEY (user_id) REFERENCES user (id)
);

INSERT INTO
    games (
        user_id, name, genre, platform, date
    )
VALUES (
        1, 'Super Mario Bros', 'Platformer', 'Nintendo', '1985-09-13'
    ),
    (
        1, 'The Legend of Zelda', 'Action-Adventure', 'Nintendo', '1986-02-21'
    ),
    (
        2, 'Final Fantasy VII', 'RPG', 'PlayStation', '1997-01-31'
    ),
    (
        2, 'Crash Bandicoot', 'Platformer', 'PlayStation', '1996-09-09'
    ),
    (
        3, 'Pokémon Red', 'RPG', 'Nintendo', '1996-02-27'
    ),
    (
        3, 'Metal Gear Solid', 'Action-Adventure', 'PlayStation', '1998-10-21'
    ),
    (
        4, 'Animal Crossing: New Horizons', 'Life Simulation', 'Nintendo', '2020-03-20'
    ),
    (
        4, 'The Last of Us Part II', 'Action-Adventure', 'PlayStation', '2020-06-19'
    ),
    (
        5, 'Super Smash Bros. Ultimate', 'Fighting', 'Nintendo', '2018-12-07'
    ),
    (
        5, 'God of War', 'Action-Adventure', 'PlayStation', '2018-04-20'
    );

    CREATE TABLE movies (
        id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, name VARCHAR(100) NOT NULL, genre VARCHAR(100) NOT NULL, date DATE, FOREIGN KEY (user_id) REFERENCES user (id)
    );

    INSERT INTO
    movies (
        user_id, name, genre, date
    )
    VALUES (
        1, 'The Shawshank Redemption', 'Drama', '1994-10-14'
    ),
    (
        1, 'The Godfather', 'Crime', '1972-03-24'
    ),
    (
        2, 'The Dark Knight', 'Action', '2008-07-18'
    ),
    (
        2, 'Inception', 'Action', '2010-07-16'
    ),
    (
        3, 'Pulp Fiction', 'Crime', '1994-10-14'
    ),
    (
        3, 'Fight Club', 'Drama', '1999-11-10'
    ),
    (
        4, 'Forrest Gump', 'Drama', '1994-07-06'
    ),
    (
        4, 'The Matrix', 'Action', '1999-06-23'
    ),
    (
        5, 'The Lord of the Rings: The Return of the King', 'Fantasy', '2003-12-17'
    ),
    (
        5, 'The Lord of the Rings: The Fellowship of the Ring', 'Fantasy', '2001-12-19'
    );