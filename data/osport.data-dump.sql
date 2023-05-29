--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

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
2	Vélo
3	Handball
4	Football
5	Hockey sur gazon
6	Judo
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: osport
--

COPY public.users (id, email, is_admin, user_name, password, last_name, first_name, date_of_birth, gender, region, zip_code, city, street, description, created_at, updated_at) FROM stdin;
1	brice.joe@gmail.com	f	bricejoe	$2b$10$rJygkv/lmkrDVlzOB2xSCevagOfuG8CSeXQVGuUokn4EiThyEMSOa	Joe	Brice	1990-10-15	masculin	Île-de-France	75008	Paris	12 rue de l'Élysée	Hello tout le monde! Je suis un bon-vivant sportif aimant particulièrement les randonnées.. Au plaisir de vous rencontrer	2023-04-10 00:00:00+00	\N
2	jean.dumas@hotmail.com	f	jeandum	$2b$10$2Vk6vOQlYyfZGkPALmND6OOupjGReaCdsnMqnPf35xgrGlGwoCl2W	Dumas	Jean	2000-05-05	masculin	Occitanie	66000	Perpignan	15 boulevard des Pyrénées	Salut! Je suis un grand fan de tennis et j'aime participer à des événements sportifs.	2023-03-02 00:00:00+00	\N
3	admin@admin.com	t	admin	$2b$10$T2Re39qvr7NUZPWJm2ByieunQrV4DVBk4VVPgC6OsKpi/BVsVKktO	lefort	Emilie	1983-02-01	féminin	Occitanie	68000	Colmar	15 boulevard de Strasbourg	Salut! Je suis votre admin préférée !! En bref la loi c'est moi mais je suis plutôt cool et grande fan de sport!	2023-05-05 00:00:00+00	\N
4	ernestine@gmail.com	f	ernestine	$2b$10$Gmom1ulh.Bv4y.fAKnZSWuTBn/ih0QA7OV15yMFgp0I1PYEG.eWu.	Pageot	Ernestine	1972-03-10	féminin	Grand Est	57000	Metz	10 rue de l'Ornière	J'aime le judo mais aussi les randonnées vélo, au plaisir de partager des activités avec vous	2023-05-28 18:16:11.477+00	2023-05-28 18:16:11.477+00
5	leodino@gmail.com	f	leodino	$2b$10$uuR45T4qI.Zy7baj5Z.OjeH5ZF.01zqDWysn/P4sx0ayYPhOWUCtq	Dinozof	Leo	2002-11-20	masculin	Ile-De-France	75000	Paris	10 rue de la Vilette	Salut je suis très sportif, je m'entraîne au moins 7h par semaine et pratique le handball et le tennis. 	2023-05-28 18:21:05.542+00	2023-05-28 18:23:04.373+00
7	melusine@gmail.com	f	melusine	$2b$10$M0QSYV/0EzsqfUeNQpK2POi8o2U5FbosiDdwVBFiD/FFoLXWfzzvW	Anfayite	Mélusine	1998-02-10	féminin	Auvergne	15000	Mauriac	17 rue de la Mairie	Vive le Hockey sur gazon j'adore ! Vous ne connaissez pas ? C'est comme le Hockey sur glace mais sur gazon !!	2023-05-28 18:32:20.988+00	2023-05-28 18:32:20.988+00
8	rafilou@gmail.com	f	rafilou	$2b$10$cGKRYB07p9hvtq55nG3eQ.ZWQM6xwWsC8RfLr8.LkywyRPdjYYqrm	Tambourin	Raphael	1987-07-15	masculin	Nouvelle-Aquitaine	33000	Bordeaux	7 rue de l'Atlantique	Salut moi c'est Raph, mais tout le monde m'appelle Roberto. Je suis multisport : je n'en pratique aucun. Au plaisir de la découverte.	2023-05-28 18:36:58.926+00	2023-05-28 18:36:58.926+00
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: osport
--

COPY public.events (id, creator_id, sport_id, title, region, zip_code, city, street, description, max_nb_participants, starting_time, ending_time, created_at, updated_at) FROM stdin;
1	1	2	Randonnée vélo à Paris	Île-de-France	75015	Paris	Parc de la Villette	Hello, je propose une randonnée en vélo dans Paris !	10	2023-06-01 10:00:00+00	2023-06-02 18:00:00+00	2023-05-05 10:00:00+00	2023-05-07 08:00:00+00
2	2	1	Petit tennis entre amis à Perpignan	Occitanie	66000	Perpignan	12 rue des Sports	Salut, un petit tennis ça vous tente ?	6	2023-06-10 10:00:00+00	2023-06-10 18:00:00+00	2023-05-05 10:00:00+00	2023-05-07 08:00:00+00
3	2	1	Match de tennis engagé	Occitanie	66000	Perpignan	Centre sportif Nord	Bonjour, je cherche une opposition engagée pour un match en 3 sets gagnants !	2	2023-06-17 16:00:00+00	2023-06-17 19:00:00+00	2023-05-28 18:59:28.294+00	2023-05-28 18:59:28.294+00
4	2	2	Boucle cycliste Gravel autour de Perpignan	Occitanie	66000	Perpignan	Parking Carrefour ZI Ouest 	Grande boucle verte de Perpignan  et vélo Gravel, bon niveau, venez nombreux !	15	2023-07-04 09:00:00+00	2023-07-04 16:00:00+00	2023-05-28 19:02:47.037+00	2023-05-28 19:02:47.037+00
5	1	3	Open amateur Hand 2023	Île-de-France	75000	Paris	Bercy Parce des Sports	Je vous propose de monter une team de Hand pour l'Open amateur 2023 de Paris Bercy	10	2023-06-24 09:00:00+00	2023-06-25 20:00:00+00	2023-05-28 19:05:55.929+00	2023-05-28 19:05:55.929+00
6	4	6	Découverte des tatamis	Grand Est	57000	Metz	Salle omnisport ASPTT	Je propose une initiation pour adultes au judo, venez vous serez conquis	7	2023-06-09 18:30:00+00	2023-06-09 20:00:00+00	2023-05-28 19:10:33.575+00	2023-05-28 19:10:33.575+00
7	5	3	Sandball à Salers	Auvergne	15000	Salers	Place centrale	Salut, je vous propose de participer au tournoi de Sandball (hand sur sable) lors de l'event Salers Sandball 2023. Nous pourrions nous inscrire et monter une équipe.	12	2023-07-12 10:00:00+00	2023-07-12 19:00:00+00	2023-05-28 19:14:21.648+00	2023-05-28 19:14:21.648+00
8	5	1	Tennis match double	Auvergne	15000	Mauriac	Salle des sports	Je cherche des amateurs de tennis pour une opposition bon esprit mais sérieuse, en double	4	2023-06-14 18:30:00+00	2023-06-14 20:30:00+00	2023-05-28 19:18:10.211+00	2023-05-28 19:18:10.211+00
9	7	5	Le hockey c'est OK	Auvergne	15350	Drugeac	Terrain de foot	Initiation au hockey sur gazon à Drugeac	12	2023-06-22 18:20:00+00	2023-06-22 19:30:00+00	2023-05-28 19:20:57.423+00	2023-05-28 19:20:57.423+00
\.


--
-- Data for Name: users_join_events; Type: TABLE DATA; Schema: public; Owner: osport
--

COPY public.users_join_events (event_id, user_id) FROM stdin;
1	1
2	1
2	2
3	2
4	2
5	1
6	4
7	5
8	5
9	7
7	7
4	7
4	1
4	8
6	8
3	8
9	8
5	5
8	7
4	4
1	4
1	5
9	5
\.


--
-- Data for Name: users_like_sports; Type: TABLE DATA; Schema: public; Owner: osport
--

COPY public.users_like_sports (user_id, sport_id) FROM stdin;
1	2
1	3
2	1
3	5
3	6
4	6
4	2
5	1
5	3
7	5
8	2
\.


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: osport
--

SELECT pg_catalog.setval('public.events_id_seq', 9, true);


--
-- Name: sports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: osport
--

SELECT pg_catalog.setval('public.sports_id_seq', 7, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: osport
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- PostgreSQL database dump complete
--

