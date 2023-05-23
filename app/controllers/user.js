const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { Users, Events, Sports } = require('../models');
const logger = require('../utils/logger');
const eventUsers = require('../services/eventUsers');

const userCtrl = {

  // Récupère tous les utilisateurs.
  getAllUsers: async (req, res) => {
    try {
      // SELECT id, isAdmin, userName, region, city, description FROM users;
      const users = await Users.findAll({
        attributes: { exclude: ['email', 'password', 'lastName', 'firstName', 'zipCode', 'street'] },
        include: [
          {
            model: Sports,
            as: 'favoriteSports',
          },
        ],
      });

      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Récupère l’utilisateur ciblé par l’ID.
  getOneUser: async (req, res) => {
    const { userId } = req.params;

    try {
      // SELECT id, isAdmin, userName, region, city, description FROM users WHERE id = $1;
      const user = await Users.findByPk(userId, {
        attributes: { exclude: ['email', 'password', 'lastName', 'firstName', 'zipCode', 'street'] },
        include: [
          {
            model: Sports,
            as: 'favoriteSports',
          },
        ],
      });

      if (!user) {
        res.status(404).json('Utilisateur introuvable');
      } else {
        res.json(user);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Récupère l’utilisateur ciblé par l’ID et ses informations privées.
  getOneUserPrivate: async (req, res) => {
    const { userId } = req.params;

    try {
      // SELECT id, username, email, firstname, lastname, password FROM users WHERE id = $1;
      const user = await Users.findByPk(userId, {
        attributes: ['id', 'userName', 'email', 'firstName', 'lastName', 'zipCode', 'street'],
      });

      if (!user) {
        return res.status(404).json('Utilisateur introuvable');
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  // Crée un nouvel utilisateur.
  createOneUser: async (req, res) => {
    try {
      // Récupération des variables du body request.
      const {
        firstName,
        lastName,
        userName,
        email,
        password,
        passwordConfirm,
        dateOfBirth,
        gender,
        region,
        zipCode,
        city,
        street,
      } = req.body;

      // Tableau listant les erreurs rencontrées : chaque erreur est pushée.
      const bodyErrors = [];

      if (!emailValidator.validate(email)) {
        bodyErrors.push('Email invalide');
      }
      if (password !== passwordConfirm) {
        bodyErrors.push('Le mot de passe ne correspond pas');
      }
      if (!firstName) {
        bodyErrors.push('Le prénom ne peut pas être vide');
      }
      if (!lastName) {
        bodyErrors.push('Le nom de famille ne peut pas être vide');
      }
      if (!userName) {
        bodyErrors.push("Le nom d'utilisateur ne peut pas être vide");
      }
      if (!dateOfBirth) {
        bodyErrors.push("La date d'anniversaire ne peut pas être vide");
      }
      if (!gender) {
        bodyErrors.push('Le genre ne peut pas être vide');
      }
      if (!region) {
        bodyErrors.push('La région ne peut pas être vide');
      }
      if (Number.isNaN(zipCode)) {
        bodyErrors.push('Le code postal doit être un nombre');
      }
      if (!zipCode) {
        bodyErrors.push('Le code postal ne peut pas être vide');
      }
      if (!city) {
        bodyErrors.push('La ville ne peut pas être vide');
      }
      if (!street) {
        bodyErrors.push('La rue ne peut pas être vide');
      }

      // Tableau non vide = erreur(s) rencontrée(s).
      if (bodyErrors.length > 0) {
        res.json({
          error: bodyErrors.join(', '),
        });
        return;
      }

      const checkUser = await Users.findOne({
        where: {
          email,
        },
      });

      if (checkUser) {
        res.json({
          error: 'Email déjà utilisé',
        });
        return;
      }

      // Encryption du mot de passe.
      const hashedPassword = await bcrypt.hash(password, 10);

      // INSERT INTO users (first_name, last_name, user_name, is_admin,
      // email, password, date_of_birth, gender, region, zip_code, city, street)
      // VALUES ('valeur_first_name', 'valeur_last_name',
      // 'valeur_user_name', false, 'valeur_email', 'valeur_password',
      // 'valeur_date_of_birth', 'valeur_gender',
      // 'valeur_region', 'valeur_zip_code', 'valeur_city', 'valeur_street');
      // Création de l'utilisateur avec les champs recquis.
      await Users.create({
        firstName,
        lastName,
        userName,
        isAdmin: false,
        email,
        password: hashedPassword,
        dateOfBirth,
        gender,
        region,
        zipCode,
        city,
        street,
      });

      res.json({
        message: 'Vous pouvez maintenant vous connecter !',
      });
    } catch (error) {
      logger.log(error);
      res.json({ error: error.message });
    }
  },

  // Mise à jour des informations de l’utilisateur ciblé par l’ID.
  updateOneUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await Users.findByPk(userId);
      // UPDATE users
      // SET first_name = 'valeur_first_name', last_name =
      // 'valeur_last_name', user_name = 'valeur_user_name', email =
      // 'valeur_email', password = 'valeur_password', date_of_birth =
      // 'valeur_date_of_birth', gender = 'valeur_gender', region =
      // 'valeur_region', zip_code = 'valeur_zip_code', city =
      // 'valeur_city', street = 'valeur_street'
      // WHERE id = 'valeur_users.id';
      if (!user) {
        return res.status(404).send(`Impossible de trouver l'utilisateur avec l'identifiant ${userId}`);
      }
      const {
        firstName,
        lastName,
        userName,
        email,
        password,
        dateOfBirth,
        gender,
        region,
        zipCode,
        city,
        street,
      } = req.body;

      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (userName) user.userName = userName;
      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 10);
      if (dateOfBirth) user.dateOfBirth = dateOfBirth;
      if (gender) user.gender = gender;
      if (region) user.region = region;
      if (zipCode) user.zipCode = zipCode;
      if (city) user.city = city;
      if (street) user.street = street;
      user.updateAt = new Date();
      // Sauvegarde des champs dans la BDD.
      await user.save();
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Supprime un utilisateur ciblé par l’ID.
  deleteOneUser: async (req, res) => {
    try {
      // DELETE FROM users
      // WHERE id = 'valeur_users.id';
      const { userId } = req.params;
      const user = await Users.findByPk(userId);

      if (!user) {
        return res.status(404).send(`Utilisateur avec l'identifiant  ${userId} introuvable`);
      }
      await user.destroy();
      return res.json({ message: `L'utilisateur avec l'identifiant ${userId} vient d'être supprimé` });
    } catch (error) {
      logger.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Récupère la liste des événements auxquels un utilisateur ayant l’ID spécifié participe.
  getAllEventsFromOneUser: async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await Users.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'Utilisateur introuvable' });
      }

      // Recherche des événements auxquels l'utilisateur participe
      // La méthode "getUserEvents" est créée par Sequelize via les
      // infos fournies dans les modèles.
      const events = await user.getUserEvents({
        include: [
          {
            model: Users,
            as: 'creator',
            attributes: ['userName'],
          },
          {
            model: Sports,
            as: 'sport',
            attributes: ['name'],
          },
          {
            model: Users,
            as: 'eventUsers',
            attributes: ['userName'],
          },
        ],
      });

      // On retourne la liste des événements
      return res.json(events);
    } catch (error) {
      logger.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Récupère la liste des événements créés par un utilisateur ayant l’ID spécifié.
  getAllEventsCreatedByOneUser: async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await Users.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'Utilisateur introuvable' });
      }

      // Recherche des événements créés par l'uilisateur
      // La méthode "getCreatedEvents" est créée par Sequelize via les
      // infos fournies dans les modèles.
      const events = await user.getCreatedEvents({
        include: [
          { model: Users, as: 'creator', attributes: ['userName'] },
          { model: Sports, as: 'sport', attributes: ['name'] },
        ],
      });

      // On retourne la liste des événements
      return res.json(events);
    } catch (error) {
      logger.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Ajoute un utilisateur identifié par son ID à l’événement identifié par son ID.
  addOneUserToOneEvent: async (req, res) => {
    try {
      // INSERT INTO users_join_events (user_id, event_id)
      // VALUES ('valeur_user_id', 'valeur_event_id');
      const { userId, eventId } = req.params;

      const user = await Users.findByPk(userId);
      const event = await Events.findByPk(
        eventId,
        {
          include: [
            {
              model: Users,
              through: 'users-join-events',
              as: 'eventUsers',
              attributes: ['userName'],
            },
          ],
        },
      );

      if (!user || !event) {
        return res.status(404).json({ error: 'Utilisateur ou évènement introuvable' });
      }
      // On vérifie que l'utilisateur n'est pas déjà inscrit
      if (event.eventUsers.userId = req.params.userId) {
        return res.json({ message: 'Utilisateur déjà inscrit!' });
      }
      // On ajoute l'utilisateur à l'événement.
      // La méthode "addUserEvents" est créée par Sequelize via les
      // infos fournies dans les modèles.
      const maxUsers = await eventUsers.countUsersFromOneEvent(eventId, userId);

      if (maxUsers) {
        return res.json({ message: 'Nombre maximum de participants atteint!' });
      }

      await user.addUserEvents(event);

      return res.json({ message: 'Utilisateur ajouté à l\'évènement avec succès' });
    } catch (error) {
      logger.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Supprime un utilisateur identifié par son ID de l’événement identifié par son ID.
  deleteOneUserFromOneEvent: async (req, res) => {
    try {
      // DELETE FROM users_join_events
      // WHERE user_id = 'valeur_user_id' AND event_id = 'valeur_event_id';
      const { userId, eventId } = req.params;

      const user = await Users.findByPk(userId);
      const event = await Events.findByPk(eventId);

      if (!user || !event) {
        return res.status(404).json({ error: 'Utilisateur ou évènement introuvable' });
      }

      // On supprime l'utilisateur de l'événement.
      // La méthode "removeUserEvents" est créée par Sequelize via les
      // infos fournies dans les modèles.
      await user.removeUserEvents(event);

      return res.json({ message: 'Utilisateur supprimé de l\'évènement avec succès' });
    } catch (error) {
      logger.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Récupère la liste des sports préférés d'un utilisateur ciblé par son ID.
  getAllSportsFromOneUser: async (req, res) => {
    try {
      // SELECT name
      // FROM sports
      // INNER JOIN users_like_sports ON sports.id = users_like_sports.sport_id
      // WHERE users_like_sports.user_id = 'valeur_user_id';
      const { userId } = req.params;

      const user = await Users.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'Utilisateur introuvable' });
      }

      // Recherche des sports préférés de l'utilisateur.
      // La méthode "getFavoriteSports" est créée par Sequelize via les
      // infos fournies dans les modèles.
      const sports = await user.getFavoriteSports();

      // On retourne la liste des sports.
      return res.json(sports);
    } catch (error) {
      logger.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Ajoute le sport identifié par son ID à l’utilisateur identifié par son ID.
  addOneSportToOneUser: async (req, res) => {
    try {
      // INSERT INTO users_like_sports (user_id, sport_id)
      // VALUES ('valeur_user_id', 'valeur_sport_id');
      const { userId, sportId } = req.params;

      const user = await Users.findByPk(userId);
      const sport = await Sports.findByPk(sportId);

      if (!user || !sport) {
        return res.status(404).json({ error: 'Utilisateur ou sport introuvable' });
      }

      // Ajout du sport aux favoris de l'utilisateur.
      // La méthode "addFavoriteSport" est créée par Sequelize via les
      // infos fournies dans les modèles.
      await user.addFavoriteSport(sport);

      return res.json({ message: 'Sport favori ajouté à l\'utilisateur avec succès' });
    } catch (error) {
      logger.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Supprime le sport favori identifié par son ID à l’utilisateur identifié par son ID.
  deleteOneSportToOneUser: async (req, res) => {
    try {
      // DELETE FROM users_like_sports
      // WHERE user_id = 'valeur_user_id' AND sport_id ='valeur_sport_id';
      const { userId, sportId } = req.params;

      const user = await Users.findByPk(userId);
      const sport = await Sports.findByPk(sportId);

      if (!user || !sport) {
        return res.status(404).json({ error: 'Utilisateur ou sport introuvable' });
      }

      // Suppression du sport des favoris de l'utilisateur
      // La méthode "addFavoriteSport" est créée par Sequelize via les
      // infos fournies dans les modèles.
      await user.removeFavoriteSport(sport);

      return res.json({ message: 'Sport favori de l\'utilisateur supprimé avec succès' });
    } catch (error) {
      logger.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

};

module.exports = userCtrl;
