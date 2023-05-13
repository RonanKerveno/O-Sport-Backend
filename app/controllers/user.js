const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { Users, Events, Sports } = require('../models');

const userCtrl = {

  getAllUsers: async (req, res) => {
    try {
      // SELECT * FROM users;
      const users = await Users.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

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

  createOneUser: async (req, res) => {
    try {
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

      console.log('body2', req.body);

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

      const hashedPassword = await bcrypt.hash(password, 10);

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

        await user.save();
        res.json(user);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },

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

  getAllEventsFromOneUser: async (req, res) => {
    try {
      const userId = req.params.id;

      // Recherche des événements créés par l'utilisateur
      const events = await Events.findAll({
        where: {
          creator_id: userId,
        },
      });

      res.json(events);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  

  async addOneUserToOneEvent(req, res) {
    try {

    } catch (error) {

    }
  },

  async deleteOneUserFromOneEvent(req, res) {
    try {

    } catch (error) {

    }
  },

  getAllSportsFromOneUser: async (req, res) => {
    const userId = req.params.id;

    try {
      // SELECT s.* FROM users_like_sports AS uls
      // INNER JOIN sports AS s ON uls.sport_id = s.id
      // WHERE uls.user_id = $1;
      const user = await Users.findByPk(userId, {
        include: [
          {
            model: Sports,
            as: 'favoriteSports',
          },
        ],
      });

      if (!user) {
        res.status(404).json('User not found');
      } else {
        const sports = user.favoriteSports;
        res.json(sports);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async addOneSportToOneUser(req, res) {
    try {

    } catch (error) {

    }
  },

  async deleteOneSportToOneUser(req, res) {
    try {

    } catch (error) {

    }
  },
};

module.exports = userCtrl;
