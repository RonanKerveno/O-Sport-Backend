const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { Users, Events, Sports } = require('../models');

const userCtrl = {

  // Récupère tous les utilisateurs.
  getAllUsers: async (req, res) => {
    try {
      // SELECT * FROM users;
      const users = await Users.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Récupère l’utilisateur ciblé par l’ID.
  getOneUser: async (req, res) => {
    const userId = req.params.id;

    try {
      // SELECT * FROM users WHERE id = $1;
      const user = await Users.findByPk(userId);

      if (!user) {
        res.status(404).json('User not found');
      } else {
        res.json(user);
      }
    } catch (error) {
      res.status(500).json(error);
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

      // Création de l'utilisateur avec les champs recquis.
      await Users.create({
        firstName,
        lastName,
        userName,
        isAdmin: false,
        email,
        password: hashedPassword,
        region,
        zipCode,
        city,
        street,
      });

      res.json({
        message: 'Vous pouvez maintenant vous connecter !',
      });
    } catch (error) {
      console.log(error);
      res.json({ error: error.message });
    }
  },

  // Mise à jour des informations de l’utilisateur ciblé par l’ID.
  updateOneUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await Users.findByPk(userId);

      if (!user) {
        res.status(404).send(`Can't find user with id ${userId}`);
      } else {
        const {
          firstName,
          lastName,
          userName,
          email,
          password,
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
        if (region) user.region = region;
        if (zipCode) user.zipCode = zipCode;
        if (city) user.city = city;
        if (street) user.street = street;

        // Sauvegarde des champs dans la BDD.
        await user.save();
        res.json(user);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },

  // Supprime un utilisateur ciblé par l’ID.
  deleteOneUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await Users.findByPk(userId);

      if (!user) {
        res.status(404).send(`Can't find user with id ${userId}`);
      } else {
        await user.destroy();
        res.json({ message: `User with id ${userId} has been deleted` });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },

  // Récupère la liste des événements auxquels un utilisateur ayant l’ID spécifié participe.
  getAllEventsFromOneUser: async (req, res) => {
    try {
      const { id: userId } = req.params;

      const user = await Users.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Recherche des événements auxquels l'utilisateur participe
      // La méthode "getUserEvents" est créée par Sequelize via les
      // infos fournies dans les modèles.
      const events = await user.getUserEvents();

      // On retourne la liste des événements
      return res.json(events);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Récupère la liste des événements créés par un utilisateur ayant l’ID spécifié.
  getAllEventsCreatedByOneUser: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await Users.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Recherche des événements créés par l'uilisateur
      // La méthode "getCreatedEvents" est créée par Sequelize via les
      // infos fournies dans les modèles.
      const events = await user.getCreatedEvents();

      // On retourne la liste des événements
      return res.json(events);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Ajoute un utilisateur identifié par son ID à l’événement identifié par son ID.
  addOneUserToOneEvent: async (req, res) => {
    try {
      const { userId, eventId } = req.params;

      const user = await Users.findByPk(userId);
      const event = await Events.findByPk(eventId);

      if (!user || !event) {
        return res.status(404).json({ error: 'User or Event not found' });
      }

      // On ajoute l'utilisateur à l'événement.
      // La méthode "addUserEvents" est créée par Sequelize via les
      // infos fournies dans les modèles.
      await user.addUserEvents(event);

      return res.json({ message: 'User added to the event successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Supprime un utilisateur identifié par son ID de l’événement identifié par son ID.
  deleteOneUserFromOneEvent: async (req, res) => {
    try {
      const { userId, eventId } = req.params;

      const user = await Users.findByPk(userId);
      const event = await Events.findByPk(eventId);

      if (!user || !event) {
        return res.status(404).json({ error: 'User or Event not found' });
      }

      // On supprime l'utilisateur de l'événement.
      // La méthode "removeUserEvents" est créée par Sequelize via les
      // infos fournies dans les modèles.
      await user.removeUserEvents(event);

      return res.json({ message: 'User removed from the event successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Récupère la liste des sports préférés d'un utilisateur ciblé par son ID.
  getAllSportsFromOneUser: async (req, res) => {
    try {
      const { id: userId } = req.params;

      const user = await Users.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Recherche des sports préférés de l'utilisateur.
      // La méthode "getFavoriteSports" est créée par Sequelize via les
      // infos fournies dans les modèles.
      const sports = await user.getFavoriteSports();

      // On retourne la liste des sports.
      return res.json(sports);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Ajoute le sport identifié par son ID à l’utilisateur identifié par son ID.
  addOneSportToOneUser: async (req, res) => {
    try {
      const { userId, sportId } = req.params;

      const user = await Users.findByPk(userId);
      const sport = await Sports.findByPk(sportId);

      if (!user || !sport) {
        return res.status(404).json({ error: 'User or Sport not found' });
      }

      // Ajout du sport aux favoris de l'utilisateur.
      // La méthode "addFavoriteSport" est créée par Sequelize via les
      // infos fournies dans les modèles.
      await user.addFavoriteSport(sport);

      return res.json({ message: 'Sport added to the user\'s favorites successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Supprime le sport identifié par son ID à l’utilisateur identifié par son ID.
  deleteOneSportToOneUser: async (req, res) => {
    try {
      const { userId, sportId } = req.params;

      const user = await Users.findByPk(userId);
      const sport = await Sports.findByPk(sportId);

      if (!user || !sport) {
        return res.status(404).json({ error: 'User or Sport not found' });
      }

      // Suppression du sport des favoris de l'utilisateur
      // La méthode "addFavoriteSport" est créée par Sequelize via les
      // infos fournies dans les modèles.
      await user.removeFavoriteSport(sport);

      return res.json({ message: 'Sport removed from the user\'s favorites successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

};

module.exports = userCtrl;
