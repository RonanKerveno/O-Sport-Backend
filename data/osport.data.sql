BEGIN;

INSERT INTO "users" ("id", "email", "is_admin", "user_name", "password", "last_name", "first_name", "description")
VALUES
    (1, 'gigi@grate.net', FALSE, 'doudou', 'blabla', 'brice', 'joe', 'Hello tout le monde! Je suis un bon-vivant sportif aimant particulièrement les randonnées.. au plaisir de vous rencontrer'),
    (2, 'fresi@hqgiu.com', FALSE, 'zorro', 'irgfvqoy', 'dumas', 'jean', 'youhouuuuuuuu');
    

INSERT INTO "events" ("id","author", "title", "region", "department", "city", "address", "description", "starting_time", "ending_time" )
VALUES
    (1, 'doudou', 'randonnées vélos', 'Est', 'là où il fait froid', 'mais qu on y mange bien', 'strasbourg ', 'Hello, ben une randonnée en vélo quoi !', '2023-05-10 10:00:00', '2023-05-10 18:00:00' ),   
    (2, 'zorro', 'petit tennis entre amis', 'occitanie', 'où il fait chaud', 'et que c est tout sec', 'perpignan 12 rue ...', 'Hello, un petit tennis ça vous tente ?', '2023-04-10 10:00:00', '2023-04-10 18:00:00' );
    
INSERT INTO "sports" ("id", "name")
VALUES 
    (1, 'Football'),
    (2, 'Vélo');

INSERT INTO "users_join_events" ("event_id", "user_id")
VALUES
    (1, 1),
    (2, 1);

INSERT INTO "users_like_sports" ("user_id", "sport_id")
VALUES
    (1, 1),
    (1, 2);

COMMIT;