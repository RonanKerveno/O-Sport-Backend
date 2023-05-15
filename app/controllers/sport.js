const { Sports } = require('../models');

const sportCtrl = {

  getAllSports: async (req, res) => {
    try {
      // SELECT * FROM sports;
      const sports = await Sports.findAll();
      res.json(sports);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getOneSport: async (req, res) => {
    const sportId = req.params.id;

    try {
      // SELECT * FROM sports WHERE id = $1;
      const sport = await Sports.findByPk(sportId);

      if (!sport) {
        res.status(404).json('Sport not found');
      } else {
        res.json(sport);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createOneSport: async (req, res) => {
    try {
      const name = req.body;
      const bodyErrors = [];
      if (!name) {
        bodyErrors.push('Le nom du sport ne peut pas être vide');
      }
      if (bodyErrors.length > 0) {
        res.json({
          error: bodyErrors,
        });
      }
      const checkSport = await Sports.findOne({
        where: {
          name,
        },
      });
      if (checkSport) {
        res.json({
          error: 'Nom de sport déjà utilisé',
        });
        return;
      }
      await Sports.create(name);
      res.json({
        message: 'Le nouveau sport a bien été créé',
      });
    } catch (error) {
      console.log(error);
      res.json({ error: error.message });
    }
  },

  updateOneSport: async (req, res) => {
    try {
      const sportId = req.params.id;
      const sport = await Sports.findByPk(sportId);

      if (!sport) {
        res.status(404).send(`Can't find sport with id ${sportId}`);
      } else {
        const name = req.body;

        if (name) sport.name = name;

        // Sauvegarde des champs dans la BDD.
        await sport.save();
        res.json(sport);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },

  deleteOneSport: async (req, res) => {
    try {
      const sportId = req.params.id;
      const sport = await Sports.findByPk(sportId);

      if (!sport) {
        res.status(404).send(`Can't find sport with id ${sportId}`);
      } else {
        await sport.destroy();
        res.json({ message: `Sport with id ${sportId} has been deleted` });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },

};

module.exports = sportCtrl;
