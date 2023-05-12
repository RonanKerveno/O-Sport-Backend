/* eslint-disable no-unused-vars */
const { Users } = require('../models');

console.log('bla3');

const userCtrl = {

  async exemple(req, res) {
  
    res.end('todo1');
  },
  
  async getAllUsers(req, res) {
    console.log('bla2');
    try {
      const result = await Users.findAll();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  },


  async getOneUser(req, res) {
    const { id } = req.params;

    try {
      const response = await Users.findByPk(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },

  async createOneUser(req, res) {
    try {
      
    } catch (error) {

    }
  },

  async updateOneUser(req, res) {
    try {

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
