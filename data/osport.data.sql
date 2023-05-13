BEGIN;

INSERT INTO "users" ("id", "email", "is_admin", "user_name", "password", "last_name", "first_name", "region", "zip_code", "city", "street", "description")
VALUES
    (1, 'brice.joe@gmail.com', FALSE, 'bricejoe', 'bricejoe', 'Joe', 'Brice', 'Île-de-France', '75008', 'Paris', '12 rue de l''Élysée', 'Hello tout le monde! Je suis un bon-vivant sportif aimant particulièrement les randonnées.. Au plaisir de vous rencontrer'),
    (2, 'jean.dumas@hotmail.com', FALSE, 'jeandum', 'jeandum', 'Dumas', 'Jean', 'Occitanie', '66000', 'Perpignan', '15 boulevard des Pyrénées', 'Salut! Je suis un grand fan de tennis et j''aime participer à des événements sportifs.');
    
INSERT INTO "sports" ("id", "name")
VALUES 
    (1, 'Tennis'),
    (2, 'Vélo'),
    (3, 'Handball'),
    (4, 'Football');
    
INSERT INTO "events" ("id", "creator_id", "sport_id", "title", "region", "zip_code", "city", "street", "description", "starting_time", "ending_time" )
VALUES
    (1, 1, 2, 'Randonnée vélo à Paris', 'Île-de-France', '75015', 'Paris', 'Parc de la Villette', 'Hello, je propose une randonnée en vélo dans Paris !', '2023-05-10 10:00:00', '2023-05-10 18:00:00' ),   
    (2, 2, 1, 'Petit tennis entre amis à Perpignan', 'Occitanie', '66000', 'Perpignan', '12 rue des Sports', 'Salut, un petit tennis ça vous tente ?', '2023-04-10 10:00:00', '2023-04-10 18:00:00' );

INSERT INTO "users_join_events" ("event_id", "user_id")
VALUES
    (1, 1),
    (2, 1);

INSERT INTO "users_like_sports" ("user_id", "sport_id")
VALUES
    (1, 2),
    (1, 3),
    (2, 1);

SELECT setval(pg_get_serial_sequence('users', 'id'), coalesce(max(id),0) + 1, false) FROM users;
SELECT setval(pg_get_serial_sequence('sports', 'id'), coalesce(max(id),0) + 1, false) FROM sports;
SELECT setval(pg_get_serial_sequence('events', 'id'), coalesce(max(id),0) + 1, false) FROM events;
SELECT setval(pg_get_serial_sequence('users_join_events', 'user_id'), coalesce(max(user_id),0) + 1, false) FROM users_join_events;
SELECT setval(pg_get_serial_sequence('users_like_sports', 'user_id'), coalesce(max(user_id),0) + 1, false) FROM users_like_sports;

COMMIT;
