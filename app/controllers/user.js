/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { Users } = require('../models');

console.log('youhouuuuuuu');

const userCtrl = {
  
  getAllUsers: async function (req, res) {
    try {
      const users = await Users.findAll();
      res.json(users);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  exemple: (req, res) => {
    res.end('todo1');
  },

  getOneUser: async function (req, res) {
    const { id } = req.params;

    try {
      const response = await Users.findByPk(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },

  // eslint-disable-next-line func-names
  createOneUser: async function (req, res) {
    try {
      const {
        firstname, lastname, user_name, email, password
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
          firstname, lastname, user_name, email, password
        });
        await newUser.save();
        res.json(newUser);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  updateOneUser: async function (req, res) {
    try {
      const UserId = req.params.id;
      const user = await Users.findByPk(UserId);
      if (!user) {
        res.status(404).send("Cant find user with id " + userId);
      } else {
        const { firstname, lastname, user_name, email, password } = req.body;
        if (firstname, lastname, user_name, email, password) {
          Users.firstname = fistname;

        }
        await task.save();
        res.json(task);
      }
    } catch (error) {

    }
  },

  deleteOneUser: async function (req, res) {
    try {

    } catch (error) {

    }
  },

  getAllEventsFromOneUser: async function (req, res) {
    try {

    } catch (error) {

    }
  },

  addOneUserToOneEvent: async function(req, res) {
    try {

    } catch (error) {

    }
  },

  deleteOneUserFromOneEvent: async function (req, res) {
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
