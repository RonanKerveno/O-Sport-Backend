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
      // SELECT * FROM sports WHERE id = 'valeur_sports_id';
      const sport = await Sports.findByPk(sportId);

      if (!sport) {
        res.status(404).json('Sport introuvable');
      } else {
        res.json(sport);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createOneSport: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const { name } = req.body;
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
        // INSERT INTO sports (name) VALUES ('nom_du_sport');
        await Sports.create({ name });
        res.json({
          message: 'Le nouveau sport a bien été créé',
        });
      } catch (error) {
        console.log(error);
        res.json({ error: error.message });
      }
    } else {
      res.json({
        error: 'Vous n\'avez pas les droits',
      });
    }
  },

  updateOneSport: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const sportId = req.params.id;
        const sport = await Sports.findByPk(sportId);

        if (!sport) {
          res.status(404).send(`Le sport avec l'identifiant ${sportId} est introuvable`);
        } else {
          const { name } = req.body;

          if ({ name }) sport.name = name;

          // Sauvegarde des champs dans la BDD.
          // UPDATE sports SET name = 'nouveau_nom' WHERE id = 'sport_id';
          await sport.save();
          res.json(sport);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
      }
    } else {
      res.json({
        error: 'Vous n\'avez pas les droits',
      });
    }
  },

  deleteOneSport: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const sportId = req.params.id;
        const sport = await Sports.findByPk(sportId);

        if (!sport) {
          res.status(404).send(`Le sport avec l'identifiant ${sportId} est introuvable`);
        } else {
          //  DELETE FROM sports WHERE id = 'sport_id';
          await sport.destroy();
          res.json({ message: `Le sport avec l'identifiant ${sportId} vient d'être supprimé` });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
      }
    } else {
      res.json({
        error: 'Vous n\'avez pas les droits',
      });
    }
  },

};

module.exports = sportCtrl;
