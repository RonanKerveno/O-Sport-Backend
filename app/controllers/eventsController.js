const { Events } = require('../models');

const eventsController = {

    async getAllEvents(req, res) {

        try{
            const result = await Events.findAll ();
            console.log(JSON.stringify(result, null, 2));
        } catch(error) {
            console.log(error);
        }
    },

    async getOneEvent(req, res) {
        const id = req.params.id;

        try{
            const response = await Events.findByPk(id);
            console.log(response);
        } catch(error) {
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

    async deleteOneSport(req, res) {
        try {
          
        } catch (error) {
          
        }
    },

}



module.exports = eventsController;