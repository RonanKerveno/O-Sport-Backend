const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { Op } = require('sequelize');
const { Users, Events, Sports } = require('../models');
const logger = require('../utils/logger');
const eventUsers = require('../services/eventUsers');

const userCtrl = {

  /**
 * Retrieves all users with their associated favorite sports.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves with the list of users.
 */
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

  /**
 * Retrieves a specific user by their ID, including their associated favorite sports.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves with the user data or an error message.
 */
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

  /**
 * Retrieves private information of a specific user by their ID.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves with the user data or an error message.
 */
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

  /**
 * Creates a new user.
 *
 * @param {object} req - The request object.
 * @param {object} req.body - The data provided in the request body.
 * @param {string} req.body.firstName - The first name of the user.
 * @param {string} req.body.lastName - The last name of the user.
 * @param {string} req.body.userName - The username of the user.
 * @param {boolean} req.body.isAdmin - Indicates if the user is an administrator. (default: false)
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {date} req.body.dateOfBirth - The date of birth of the user.
 * @param {string} req.body.gender - The gender of the user.
 * @param {string} req.body.region - The region of the user.
 * @param {number} req.body.zipCode - The ZIP code of the user.
 * @param {string} req.body.city - The city of the user.
 * @param {string} req.body.street - The street of the user.
 * @param {string} req.body.description - The description of the user.
 * @param {Array} req.body.favoriteSports - An array of favorite sports for the user.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves once the
 * new user is created and sent in the response.
 */
  createOneUser: async (req, res) => {
    try {
      // Récupération des variables du body request.
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
        description,
        favoriteSports,
      } = req.body;

      // Tableau listant les erreurs rencontrées : chaque erreur est pushée.
      const bodyErrors = [];

      if (!emailValidator.validate(email)) {
        bodyErrors.push('Email invalide');
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
      if (!favoriteSports || !Array.isArray(favoriteSports) || favoriteSports.length === 0) {
        bodyErrors.push('Au moins un sport doit être sélectionné');
      }
      if (favoriteSports.length > 5) {
        bodyErrors.push('Vous ne pouvez pas choisir plus de 5 sports');
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
      const newUser = await Users.create({
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
        description,
      });

      // Ajout des sports favoris
      const favoriteSportsIds = favoriteSports.map((sport) => sport.id);
      await newUser.addFavoriteSports(favoriteSportsIds);

      // Récupération des sports favoris de l'utilisateur pour la réponse
      const userWithSports = await Users.findByPk(newUser.id, {
        include: {
          model: Sports,
          as: 'favoriteSports',
          attributes: ['id', 'name'],
        },
      });

      res.json({
        message: 'Vous pouvez maintenant vous connecter !',
        user: userWithSports,
      });
    } catch (error) {
      logger.log(error);
      res.json({ error: error.message });
    }
  },

  /**
 * Updates the profile of a user.
 *
 * @param {object} req - The request object.
 * @param {object} req.params - The parameters extracted from the request.
 * @param {number} req.params.userId - The ID of the user to update.
 * @param {object} req.body - The data provided in the request body for updating the user profile.
 * @param {string} req.body.firstName - The updated first name of the user.
 * @param {string} req.body.lastName - The updated last name of the user.
 * @param {string} req.body.userName - The updated username of the user.
 * @param {string} req.body.email - The updated email of the user.
 * @param {string} req.body.password - The updated password of the user.
 * @param {date} req.body.dateOfBirth - The updated date of birth of the user.
 * @param {string} req.body.gender - The updated gender of the user.
 * @param {string} req.body.region - The updated region of the user.
 * @param {number} req.body.zipCode - The updated ZIP code of the user.
 * @param {string} req.body.city - The updated city of the user.
 * @param {string} req.body.street - The updated street of the user.
 * @param {string} req.body.description - The updated description of the user.
 * @param {Array} req.body.favoriteSports - The updated array of favorite sports for the user.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves once the
 * user profile is updated and sent in the response.
 */
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
        description,
        favoriteSports,
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
      if (description) user.description = description;

      // Ajout des sports favoris
      if (favoriteSports && Array.isArray(favoriteSports)) {
        if (favoriteSports.length === 0) {
          return res.status(400).json({ error: 'Au moins un sport doit être sélectionné' });
        }
        if (favoriteSports.length > 5) {
          return res.status(400).json({ error: 'Vous ne pouvez pas choisir plus de 5 sports' });
        }

        const favoriteSportsIds = favoriteSports.map((sport) => sport.id);
        await user.setFavoriteSports(favoriteSportsIds);
      }

      await user.save();

      // Récupération des sports favoris de l'utilisateur pour la réponse
      const updatedUser = await Users.findByPk(userId, {
        include: {
          model: Sports,
          as: 'favoriteSports',
          attributes: ['id', 'name'],
        },
      });

      return res.json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  /**
 * Delete a user.
 *
 * @param {object} req - The request object.
 * @param {object} req.params - The parameters extracted from the request.
 * @param {number} req.params.userId - The ID of the user to delete.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves once the
 * user is deleted and a success message is sent in the response.
 */
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

      // Suppression du cookie d'authentification
      let cookieOptions = { httpOnly: true, maxAge: 0 };
      if (process.env.NODE_ENV === 'production') {
        cookieOptions = { ...cookieOptions, secure: true, sameSite: 'none' };
      }
      res.cookie('token', '', cookieOptions);

      return res.json({ message: `L'utilisateur avec l'identifiant ${userId} vient d'être supprimé` });
    } catch (error) {
      logger.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  /**
 * Retrieves all events from a user.
 *
 * @param {object} req - The request object.
 * @param {object} req.params - The parameters extracted from the request.
 * @param {number} req.params.userId - The ID of the user to retrieve events from.
 * @param {object} res - The response object.
 * @returns {Promise<void>} events with creator, sport and participants
 */
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

  /**
 * Retrieves all events created by a user.
 *
 * @param {object} req - The request object.
 * @param {object} req.params - The parameters extracted from the request.
 * @param {number} req.params.userId - The ID of the user to retrieve events created by.
 * @param {object} res - The response object.
 * @returns {Promise<void>} the event, the creator (username) and sport
 */
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

  /**
 * Retrieves the registered events for a user.
 *
 * @param {object} req - The request object.
 * @param {object} req.params - The parameters extracted from the request.
 * @param {number} req.params.userId - The ID of the user to retrieve registered events for.
 * @param {object} res - The response object.
 * @returns {Promise<void>} past events from one user
 */
  getRegistriedEventsFromOneUser: async (req, res) => {
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
        where: {
          endingTime: { [Op.lte]: new Date() },
        },
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

  /**
 * Retrieves the registered events created by a user.
 *
 * @param {object} req - The request object.
 * @param {object} req.params - The parameters extracted from the request.
 * @param {number} req.params.userId - The ID of the user to retrieve registered events created by.
 * @param {object} res - The response object.
 * @returns {Promise<void>} past created events form one user
 */
  getRegistriedCreatedEventsFromOneUser: async (req, res) => {
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
        where: {
          endingTime: { [Op.lte]: new Date() },
        },
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

  /**
 * Adds a user to an event.
 *
 * @param {object} req - The request object.
 * @param {object} req.params - The parameters extracted from the request.
 * @param {number} req.params.userId - The ID of the user to add.
 * @param {number} req.params.eventId - The ID of the event to add the user to.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves once the user is added to the event.
 */
  addOneUserToOneEvent: async (req, res) => {
    try {
      // INSERT INTO users_join_events (user_id, event_id)
      // VALUES ('valeur_user_id', 'valeur_event_id');
      const { userId, eventId } = req.params;

      const user = await Users.findByPk(userId);
      const event = await Events.findByPk(
        eventId,
        {
          where: {
            // on exclue les évènements déjà commencés
            startingTime: { [Op.gte]: new Date() },
          },
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

      // Vérification si l'événement est déjà commencé ou terminé
      const currentDateTime = new Date();
      if (event.startingTime <= currentDateTime) {
        return res.json({ message: 'Cet événement est déjà commencé ou terminé' });
      }

      // On vérifie que l'utilisateur n'est pas déjà inscrit
      if (event.eventUsers.userId === req.params.userId) {
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

  /**
 * Deletes a user from an event.
 *
 * @param {object} req - The request object.
 * @param {object} req.params - The parameters extracted from the request.
 * @param {number} req.params.userId - The ID of the user to delete.
 * @param {number} req.params.eventId - The ID of the event to delete the user from.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves once the user is deleted from the event.
 */
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

  /**
 * Retrieves all favorite sports from a user.
 *
 * @param {object} req - The request object.
 * @param {object} req.params - The parameters extracted from the request.
 * @param {number} req.params.userId - The ID of the user.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves with the list of favorite sports.
 */
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

  /**
 * Adds a sport to a user's favorite sports.
 *
 * @param {object} req - The request object.
 * @param {object} req.params - The parameters extracted from the request.
 * @param {number} req.params.userId - The ID of the user.
 * @param {number} req.params.sportId - The ID of the sport.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves with a success message.
 */
  addOneSportToOneUser: async (req, res) => {
    try {
      // INSERT INTO users_like_sports (user_id, sport_id)
      // VALUES ('valeur_user_id', 'valeur_sport_id');
      const { userId, sportId } = req.params;

      const user = await Users.findByPk(userId, {
        include: [
          {
            model: Sports,
            through: 'users_like_sports',
            as: 'favoriteSports',
            attributes: ['name'],
          },
        ],
      });
      const nbFavoriteSports = user.favoriteSports.length;

      const sport = await Sports.findByPk(sportId);

      if (!user || !sport) {
        return res.status(404).json({ error: 'Utilisateur ou sport introuvable' });
      }

      // On vérifie que l'utilisateur n'a pas déjà ce sport en favori

      // if (user.favoriteSports.sportId === req.params.sportId) {
      //  return res.json({ message: 'Sport favori déjà choisi!' });
      // }

      if (nbFavoriteSports >= 5) {
        return res.json({ message: 'Vous avez atteint le nombre maximum de sports favoris déclarés' });
      }

      // L'utilisateur ne peut ajouter qu'une fois le même sport
      // favori : message d'erreur par défaut
      let isFavoriteSportChosen = false;

      user.favoriteSports.forEach((favoriteSport) => {
        if (favoriteSport.users_like_sports.sportId === parseInt(req.params.sportId, 10)) {
          isFavoriteSportChosen = true;
        }
      });

      if (isFavoriteSportChosen) {
        return res.json({ message: 'Sport favori déjà choisi!' });
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

  /**
 * Deletes a sport from a user's favorite sports.
 *
 * @param {object} req - The request object.
 * @param {object} req.params - The parameters extracted from the request.
 * @param {number} req.params.userId - The ID of the user.
 * @param {number} req.params.sportId - The ID of the sport.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves with a success message.
 */
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
