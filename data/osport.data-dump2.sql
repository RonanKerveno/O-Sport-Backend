--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: sports; Type: TABLE DATA; Schema: public; Owner: osport
--

COPY public.sports (id, name) FROM stdin;
1	Tennis
3	Handball
4	Football
6	Judo
7	Arts Martiaux
8	Baseball
9	Basketball
10	Cricket
11	Cyclisme
12	Esports
13	Fitness
14	Football americain
15	Footbike
16	Golf
17	Gymnastique
18	Hockey
19	Kitesurf
20	Marche nordique
21	Mma
22	Natation
23	Parapente
24	Patinage sur glace
25	Randonnée pédestre
26	Roller
27	Rugby
28	Running
29	Skateboard
30	Ski
31	Sport automobile
32	Surf
33	Voile
34	Volleyball
35	Yoga
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: osport
--

COPY public.users (id, email, is_admin, user_name, password, last_name, first_name, date_of_birth, gender, region, zip_code, city, street, description, created_at, updated_at) FROM stdin;
1	brice.joe@gmail.com	f	bricejoe	$2b$10$rJygkv/lmkrDVlzOB2xSCevagOfuG8CSeXQVGuUokn4EiThyEMSOa	Joe	Brice	1990-10-15	masculin	Île-de-France	75008	Paris	12 rue de l'Élysée	Hello tout le monde! Je suis un bon-vivant sportif aimant particulièrement les randonnées.. Au plaisir de vous rencontrer	2023-04-10 02:00:00+02	\N
2	jean.dumas@hotmail.com	f	jeandum	$2b$10$2Vk6vOQlYyfZGkPALmND6OOupjGReaCdsnMqnPf35xgrGlGwoCl2W	Dumas	Jean	2000-05-05	masculin	Occitanie	66000	Perpignan	15 boulevard des Pyrénées	Salut! Je suis un grand fan de tennis et j'aime participer à des événements sportifs.	2023-03-02 01:00:00+01	\N
4	ernestine@gmail.com	f	ernestine	$2b$10$Gmom1ulh.Bv4y.fAKnZSWuTBn/ih0QA7OV15yMFgp0I1PYEG.eWu.	Pageot	Ernestine	1972-03-10	féminin	Grand Est	57000	Metz	10 rue de l'Ornière	J'aime le judo mais aussi les randonnées vélo, au plaisir de partager des activités avec vous	2023-05-28 20:16:11.477+02	2023-05-28 20:16:11.477+02
5	leodino@gmail.com	f	leodino	$2b$10$uuR45T4qI.Zy7baj5Z.OjeH5ZF.01zqDWysn/P4sx0ayYPhOWUCtq	Dinozof	Leo	2002-11-20	masculin	Ile-De-France	75000	Paris	10 rue de la Vilette	Salut je suis très sportif, je m'entraîne au moins 7h par semaine et pratique le handball et le tennis. 	2023-05-28 20:21:05.542+02	2023-05-28 20:23:04.373+02
7	melusine@gmail.com	f	melusine	$2b$10$M0QSYV/0EzsqfUeNQpK2POi8o2U5FbosiDdwVBFiD/FFoLXWfzzvW	Anfayite	Mélusine	1998-02-10	féminin	Auvergne	15000	Mauriac	17 rue de la Mairie	Vive le Hockey sur gazon j'adore ! Vous ne connaissez pas ? C'est comme le Hockey sur glace mais sur gazon !!	2023-05-28 20:32:20.988+02	2023-05-28 20:32:20.988+02
8	rafilou@gmail.com	f	rafilou	$2b$10$cGKRYB07p9hvtq55nG3eQ.ZWQM6xwWsC8RfLr8.LkywyRPdjYYqrm	Tambourin	Raphael	1987-07-15	masculin	Nouvelle-Aquitaine	33000	Bordeaux	7 rue de l'Atlantique	Salut moi c'est Raph, mais tout le monde m'appelle Roberto. Je suis multisport : je n'en pratique aucun. Au plaisir de la découverte.	2023-05-28 20:36:58.926+02	2023-05-28 20:36:58.926+02
3	admin@admin.com	t	milie68	$2b$10$T2Re39qvr7NUZPWJm2ByieunQrV4DVBk4VVPgC6OsKpi/BVsVKktO	lefort	Emilie	1983-02-01	féminin	Occitanie	68000	Colmar	15 boulevard de Strasbourg	Salut! Je suis votre admin préférée !! En bref la loi c'est moi mais je suis plutôt cool et grande fan de sport!	2023-05-05 02:00:00+02	2023-05-29 23:52:08.732+02
9	caribou@gmail.com	f	caribou	$2b$10$Y9FwvJUPLP6LOokdpG51X.yHM5/8oLL2neUXF.fualW4TyRqj7u9y	Dufresnes	Guillaume	1994-05-10	masculin	Auvergne-Rhône-Alpes	42100	Saint-Etienne	8 rue Tréfilerie	Québécois installé à Saint Etienne, le sports de glace n'ont aucun secret pour moi. 	2023-05-29 23:56:15.954+02	2023-05-29 23:56:15.954+02
10	nathydu11@gmail.com	f	nathydu11	$2b$10$WhJsRNxCoVBXcRfwmMJqieMIeAqI.Y9DeHy2ydU9gptK9fAPWD/jW	Armand	Nathalie	1987-01-10	féminin	Occitanie	11200	Gruissan	2 Allée des Plages	Très sportive j'aime découvrir de nouvelles activités.	2023-05-30 00:04:52.309+02	2023-05-30 00:04:52.309+02
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: osport
--

COPY public.events (id, creator_id, sport_id, title, region, zip_code, city, street, description, max_nb_participants, starting_time, ending_time, created_at, updated_at) FROM stdin;
2	2	1	Petit tennis entre amis à Perpignan	Occitanie	66000	Perpignan	12 rue des Sports	Salut, un petit tennis ça vous tente ?	6	2023-06-10 12:00:00+02	2023-06-10 20:00:00+02	2023-05-05 12:00:00+02	2023-05-07 10:00:00+02
3	2	1	Match de tennis engagé	Occitanie	66000	Perpignan	Centre sportif Nord	Bonjour, je cherche une opposition engagée pour un match en 3 sets gagnants !	2	2023-06-17 18:00:00+02	2023-06-17 21:00:00+02	2023-05-28 20:59:28.294+02	2023-05-28 20:59:28.294+02
5	1	3	Open amateur Hand 2023	Île-de-France	75000	Paris	Bercy Parce des Sports	Je vous propose de monter une team de Hand pour l'Open amateur 2023 de Paris Bercy	10	2023-06-24 11:00:00+02	2023-06-25 22:00:00+02	2023-05-28 21:05:55.929+02	2023-05-28 21:05:55.929+02
6	4	6	Découverte des tatamis	Grand Est	57000	Metz	Salle omnisport ASPTT	Je propose une initiation pour adultes au judo, venez vous serez conquis	7	2023-06-09 20:30:00+02	2023-06-09 22:00:00+02	2023-05-28 21:10:33.575+02	2023-05-28 21:10:33.575+02
7	5	3	Sandball à Salers	Auvergne	15000	Salers	Place centrale	Salut, je vous propose de participer au tournoi de Sandball (hand sur sable) lors de l'event Salers Sandball 2023. Nous pourrions nous inscrire et monter une équipe.	12	2023-07-12 12:00:00+02	2023-07-12 21:00:00+02	2023-05-28 21:14:21.648+02	2023-05-28 21:14:21.648+02
8	5	1	Tennis match double	Auvergne	15000	Mauriac	Salle des sports	Je cherche des amateurs de tennis pour une opposition bon esprit mais sérieuse, en double	4	2023-06-14 20:30:00+02	2023-06-14 22:30:00+02	2023-05-28 21:18:10.211+02	2023-05-28 21:18:10.211+02
10	3	22	Tous à la nage !	Grand Est	68000	Colmar	Piscine du centre	RDV à la piscine de Colmar centre pour une peu de natation en toute décontraction.	6	2023-06-08 10:50:00+02	2023-06-08 12:00:00+02	2023-05-29 23:50:46.935+02	2023-05-29 23:50:46.935+02
11	9	18	Si t'es OK c'est hockey !	Auvergne-Rhône-Alpes	42000	Saint-Etienne	Patinoire Terrenoire	Ça vous direz de monter une team  de hockey amateur à Saint-Etienne ? Rejoignez moi à la patinoire de Terrenoire pour un entrainement ! 	14	2023-06-09 18:30:00+02	2023-06-09 20:00:00+02	2023-05-29 23:59:34.614+02	2023-05-29 23:59:34.614+02
12	10	11	Rando vélo dans l'Aude	Occitanie	11200	Gruissan	Intermaché	Venez nombreux pour une rando à la journée au fil des voies vertes de l'Aude. Je vous propose une magnifique boucle. VTC recommandé, pas de difficulté majeur... quoique ça dépend du vent !	20	2023-07-12 08:00:00+02	2023-07-12 18:00:00+02	2023-05-30 00:09:44.691+02	2023-05-30 00:09:44.691+02
\.


--
-- Data for Name: users_join_events; Type: TABLE DATA; Schema: public; Owner: osport
--

COPY public.users_join_events (event_id, user_id) FROM stdin;
2	1
2	2
3	2
5	1
6	4
7	5
8	5
7	7
6	8
3	8
5	5
8	7
10	3
11	9
8	9
7	9
2	10
11	10
12	10
\.


--
-- Data for Name: users_like_sports; Type: TABLE DATA; Schema: public; Owner: osport
--

COPY public.users_like_sports (user_id, sport_id) FROM stdin;
1	3
2	1
3	6
4	6
5	1
5	3
3	17
3	22
9	24
9	25
9	18
10	11
10	13
10	33
10	19
\.


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: osport
--

SELECT pg_catalog.setval('public.events_id_seq', 12, true);


--
-- Name: sports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: osport
--

SELECT pg_catalog.setval('public.sports_id_seq', 35, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: osport
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- PostgreSQL database dump complete
--

