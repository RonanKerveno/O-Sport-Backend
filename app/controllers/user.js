// const bcrypt = require('bcrypt');
// const emailValidator = require('email-validator');
const { Users, Events, Sports } = require('../models');

const userCtrl = {

  getAllUsers: async (req, res) => {
    try {
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

  // eslint-disable-next-line func-names
  async createOneUser(req, res) {
    try {
      const {
        firstname, lastname, user_name, email, password,
      } = req.body;
      const bodyErrors = [];
      if (!firstname) {
        bodyErrors.push('firstname can not be empty');
      }
      if (!lastname) {
        bodyErrors.push('lastname can not be empty');
      }
      if (!user_name) {
        bodyErrors.push('user_name can not be empty');
      }
      if (!email) {
        bodyErrors.push('email can not be empty');
      }
      if (!password) {
        bodyErrors.push('password can not be empty');
      }

      if (bodyErrors.length) {
        // si on a une erreur
        res.status(400).json(bodyErrors);
      } else {
        const newUser = Users.build({
          firstname, lastname, user_name, email, password,
        });
        await newUser.save();
        res.json(newUser);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  async updateOneUser(req, res) {
    try {
      const UserId = req.params.id;
      const user = await Users.findByPk(UserId);
      if (!user) {
        res.status(404).send(`Cant find user with id ${userId}`);
      } else {
        const {
          firstname, lastname, user_name, email, password,
        } = req.body;
        if (firstname, lastname, user_name, email, password) {
          Users.firstname = fistname;
        }
        await task.save();
        res.json(task);
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
