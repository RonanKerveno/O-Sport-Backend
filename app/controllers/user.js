const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { Users, Events, Sports } = require('../models');

const userCtrl = {

  getAllUsers: async (req, res) => {
    try {
      // SELECT * FROM users;
      const users = await Users.findAll({
        include: [
          {
            model: Events,
            as: 'created_events',
            include: { model: Sports, as: 'sport' },
          },
          {
            model: Sports,
            as: 'favorite_sport',
          },
        ],
      });
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getOneUser: async (req, res) => {
    const { id } = req.params;
    try {
      // SELECT * FROM users WHERE id = $1;
      const user = await Users.findByPk(id, {
        include: [
          {
            model: Events,
            as: 'created_events',
            include: { model: Sports, as: 'sport' },
          },
          {
            model: Sports,
            as: 'favorite_sport',
          },
        ],
      });
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
    console.log('body1', req.body);
    try {
      const {
        firstname,
        lastname,
        userName,
        email,
        password,
        passwordConfirm,
        region,
        zipcode,
        city,
        street,
        favoriteSports,
      } = req.body;

      console.log('body2', req.body);

      const bodyErrors = [];

      if (!emailValidator.validate(email)) {
        bodyErrors.push('Email invalide');
      }

      if (password !== passwordConfirm) {
        bodyErrors.push('Le mot de passe ne correspond pas');
      }

      if (!firstname) {
        bodyErrors.push('Le prénom ne peut pas être vide');
      }

      if (!lastname) {
        bodyErrors.push('Le nom de famille ne peut pas être vide');
      }

      if (!userName) {
        bodyErrors.push("Le nom d'utilisateur ne peut pas être vide");
      }

      if (!region) {
        bodyErrors.push('La région ne peut pas être vide');
      }

      if (Number.isNaN(zipcode)) {
        bodyErrors.push('Le code postal doit être un nombre');
      }

      if (!zipcode) {
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
        firstname,
        lastname,
        userName,
        isAdmin: false,
        email,
        password: hashedPassword,
        region,
        zipcode,
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

  async updateOneUser(req, res) {
    try {
      const UserId = req.params.id;
      const user = await Users.findByPk(UserId);
      if (!user) {
        res.status(404).send(`Can't find user with id ${userId}`);
      } else {
        const {
          firstname, lastname, userName, email, password, region, zipcode, city, street,
        } = req.body;
        if (firstname, lastname, userName, email, password, region, zipcode, city, street) {
          Users.firstname = firstname;
        }
        await Users.save();
        res.json(Users);
      }
    } catch (error) {

    }
  },

  async deleteOneUser(req, res) {
    try {

    } catch (error) {

    }
  },

  async getAllEventsFromOneUser(req, res) {
    try {

    } catch (error) {

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

  async getAllSportsFromOneUser(req, res) {
    try {

    } catch (error) {

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
