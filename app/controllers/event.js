const { Op } = require('sequelize');
const { Events, Users, Sports } = require('../models');
const eventUsers = require('../services/eventUsers');
// const location = require('../services/location');

const eventCtrl = {

  /**
 * Retrieves all upcoming events.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves with the list of events or an error message.
 */
  getAllEvents: async (req, res) => {
    try {
      // SELECT * FROM sports;
      const events = await Events.findAll({
        attributes: { exclude: ['description'] },
        where: {
          // on exclue les évènements déjà terminés
          endingTime: { [Op.gte]: new Date() },
        },
        include: [
          {
            model: Users,
            as: 'creator',
            attributes: ['userName'],
          },
          {
            model: Sports,
            as: 'sport',
            attributes: ['name'],
          },
          {
            model: Users,
            as: 'eventUsers',
            attributes: ['id', 'userName'],
          },
        ],
      });
      res.json(events);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  /**
 * Retrieves a single event by its ID.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves with the event details or an error message.
 */
  getOneEvent: async (req, res) => {
    const eventId = req.params.id;

    try {
      // SELECT * FROM sports WHERE id = $1;
      const event = await Events.findOne({
        // on exclue les évènements déjà terminés
        where: {
          id: eventId,
          endingTime: {
            [Op.gte]: new Date(),
          },
        },
        include: [
          {
            model: Users,
            as: 'creator',
            attributes: ['userName'],
          },
          {
            model: Sports,
            as: 'sport',
            attributes: ['name'],
          },
          {
            model: Users,
            as: 'eventUsers',
            attributes: ['id', 'userName'],
          },
        ],
      });
      if (!event) {
        res.status(404).json('Evènement introuvable');
      } else {
        res.json(event);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  /**
 * Creates a new event.
 *
 * @param {object} req - The request object.
 * @param {object} req.body - The data provided in the request body.
 * @param {number} req.body.sportId - The sportId of the sport.
 * @param {string} req.body.title - The title of the event.
 * @param {string} req.body.region - The region of the event.
 * @param {number} req.body.zipCode - The ZIP code of the event.
 * @param {string} req.body.city - The city of the event.
 * @param {string} req.body.street - The street of the event.
 * @param {string} req.body.description - The description of the event.
 * @param {number} req.body.maxNbParticipants - The maximum number of participants.
 * @param {timestamptz} req.body.startingTime - The starting time of the event.
 * @param {timestamptz} req.body.endingTime - The ending time of the event.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves once the
 * new event is created and sent in the response.
 */
  createOneEvent: async (req, res) => {
    try {
      // test service location
      // location.getAllRegions();
      // début méthode
      const {
        sportId,
        title,
        region,
        zipCode,
        city,
        street,
        description,
        maxNbParticipants,
        startingTime,
        endingTime,
      } = req.body;

      const bodyErrors = [];
      if (!sportId) {
        bodyErrors.push('Le nom du sport ne peut pas être vide');
      }
      if (!title) {
        bodyErrors.push('Le titre de l\'évènement ne peut pas être vide');
      }
      if (!region) {
        bodyErrors.push('La région ne peut pas être vide');
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
      if (!maxNbParticipants) {
        bodyErrors.push('Le nombre maximum de participants ne peut pas être vide');
      }
      if (maxNbParticipants <= 1 || maxNbParticipants > 50) {
        bodyErrors.push('Il doit y avoir au moins deux participants à un évènement.');
      }
      if (!startingTime) {
        bodyErrors.push('La date-heure de début ne peut pas être vide');
      }
      if (new Date(startingTime).getTime() <= Date.now()) {
        bodyErrors.push("La date-heure de début ne peut pas être antérieure à la création de l'événement.");
      }
      if (!endingTime) {
        bodyErrors.push('La date-heure de fin ne peut pas être vide');
      }
      if (new Date(endingTime).getTime() - new Date(startingTime).getTime() < 30 * 60000) {
        bodyErrors.push("La durée de l'évènement sportif doit être d'au moins 30 minutes");
      }

      if (bodyErrors.length > 0) {
        res.json({
          error: bodyErrors.join(', '),
        });
        return;
      }
      const checkEvent = await Events.findOne({
        where: {
          sportId,
          title,
          region,
          zipCode,
          city,
          street,
          description,
          maxNbParticipants,
          startingTime,
          endingTime,
        },
      });
      if (checkEvent) {
        res.json({
          error: 'Evènement sportif déjà créé',
        });
        return;
      }
      // INSERT INTO events (title, sport_id, region, zip_code, city, street,
      // description, max_nb_participants, starting_time, ending_time, created_at, updated_at)
      // VALUES ('valeur_title', 'valeur_sport_id', 'valeur_region', 'valeur_zipCode',
      // 'valeur_city', 'valeur_street', 'valeur_description', 'valeur_max_nb_participants',
      //  'valeur_startingTime', 'valeur_endingTime',
      // 'valeur_created_at', 'valeur_updated_at');
      // const createdEvent =
      const newEvent = await Events.create({
        sportId,
        creatorId: req.user.userId,
        title,
        region,
        zipCode,
        city,
        street,
        description,
        maxNbParticipants,
        startingTime,
        endingTime,
      });
      await eventUsers.addCreatorToEvent(newEvent.id, newEvent.creatorId);
      res.json({
        message: 'Le nouvel évènement sportif a bien été créé',
      });
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  /**
 * Updates an existing event.
 *
 * @param {object} req - The request object.
 * @param {object} req.body - The data provided in the request body.
 * @param {number} req.body.sportId - The updated sportId  of the sport.
 * @param {string} req.body.title - The updated title of the event.
 * @param {string} req.body.region - The updated region of the event.
 * @param {number} req.body.zipCode - The updated ZIP code of the event.
 * @param {string} req.body.city - The updated city of the event.
 * @param {string} req.body.street - The updated treet of the event.
 * @param {string} req.body.description - The updated description of the event.
 * @param {number} req.body.maxNbParticipants - The updated maximum number of participants.
 * @param {timestamptz} req.body.startingTime - The updated starting time of the event.
 * @param {timestamptz} req.body.endingTime - The updated ending time of the event.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves once the
 * new event is updated.
 */
  updateEvent: async (req, res) => {
    try {
      const eventId = req.params.id;
      const event = await Events.findByPk(eventId);

      if (!event) {
        return res.status(404).send(`L'évènement avec l'identifiant ${eventId} est introuvable`);
      }
      // Vérifie que l'utilisateur authentifié est le créateur de l'événement
      // ou un administrateur.
      if (req.user.userId !== event.creatorId && !req.user.isAdmin) {
        return res.status(403).json({ error: "Seul le créateur de l'événement ou un administrateur peut le modifier/supprimer." });
      }
      const {
        title,
        region,
        zipCode,
        city,
        street,
        description,
        maxNbParticipants,
        startingTime,
        endingTime,
      } = req.body;

      if (title) event.title = title;
      if (region) event.region = region;
      if (zipCode) event.zipCode = zipCode;
      if (city) event.city = city;
      if (street) event.street = street;
      if (description) event.description = description;
      if (maxNbParticipants) event.maxNbParticipants = maxNbParticipants;
      if (startingTime) event.startingTime = startingTime;
      if (endingTime) event.endingTime = endingTime;

      // Sauvegarde des champs dans la BDD.
      // UPDATE events
      // SET title = 'valeur_title', region = 'valeur_region',
      // zip_code = 'valeur_zip_code', city = 'valeur_city',
      // street = 'valeur_street', description = 'valeur_description',
      // maxNbParticipants = 'maxNbParticipants',
      // starting_time = 'valeur_starting_time',
      // ending_time = 'valeur_ending_time',
      // created_at = 'valeur_created_at',
      // updated_at = 'valeur_updated_at'
      // WHERE id = 'valeur_event.id';
      await event.save();
      return res.json(event);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  /**
 * Deletes an event.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves with a success message or an error message.
 */
  deleteEvent: async (req, res) => {
    try {
      const eventId = req.params.id;
      const event = await Events.findByPk(eventId);

      if (!event) {
        return res.status(404).send(`L'évènement avec l'identifiant ${eventId} est introuvable`);
      }
      // Vérifie que l'utilisateur authentifié est le créateur de l'événement
      // ou un administrateur.
      if (req.user.userId !== event.creatorId && !req.user.isAdmin) {
        return res.status(403).json({ error: "Seul le créateur de l'événement ou un administrateur peut le modifier/supprimer." });
      }
      await event.destroy();
      return res.json({ message: `L'évènement avec l'identifiant ${eventId} vient d'être supprimé` });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = eventCtrl;
