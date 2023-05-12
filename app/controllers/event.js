const { Events } = require('../models');


const eventCtrl = {
    
  async getAllEvents(req, res) {
    try {
      
    } catch (error) {
      console.log(error);
    }
  },

  async getOneEvent(req, res) {
    const { id } = req.params;

    try {
      const response = await Events.findByPk(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },

 

  async newEvent(req, res) {
    try {

    } catch (error) {

    }
  },

  async updateEvent(req, res) {
    try {

    } catch (error) {

    }
  },

  async deleteEvent(req, res) {
    try {

    } catch (error) {

    }
  },

};

module.exports = eventCtrl;
