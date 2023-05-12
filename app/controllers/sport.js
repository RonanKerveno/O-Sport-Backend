const { Sports } = require('../models');

const sportCtrl = {

    async getAllSports(req, res) {

        try{
            const result = await Sports.findAll ();
            console.log(JSON.stringify(result, null, 2));
        } catch(error) {
            console.log(error);
        }
    },

    async exemple(req, res) {
        res.end('todo1');
      },

    async getOneSport(req, res) {
        const id = req.params.id;

        try{
            const response = await Sports.findByPk(id);
            console.log(response);
        } catch(error) {
            console.log(error);
        }

    },

    async createOneSport(req, res) {
        try {
          
        } catch (error) {
          
        }
    },

    async updateOneSport(req, res) {
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



module.exports = sportCtrl;