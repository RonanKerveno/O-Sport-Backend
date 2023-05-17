const { Events } = require('../models');

const eventCtrl = {

  getAllEvents: async (req, res) => {
    try {
      // SELECT * FROM sports;
      const events = await Events.findAll();
      res.json(events);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getOneEvent: async (req, res) => {
    const eventId = req.params.id;

    try {
      // SELECT * FROM sports WHERE id = $1;
      const event = await Events.findByPk(eventId);

      if (!event) {
        res.status(404).json('Event not found');
      } else {
        res.json(event);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createOneEvent: async (req, res) => {
    try {
      const {
        title,
        region,
        zipCode,
        city,
        street,
        description,
        startingTime,
        endingTime,
      } = req.body;

      const bodyErrors = [];
      if (!title) {
        bodyErrors.push('Le nom du sport ne peut pas être vide');
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
      if (!startingTime) {
        bodyErrors.push('La date-heure de début ne peut pas être vide');
      }
      if (!endingTime) {
        bodyErrors.push('La date-heure de fin ne peut pas être vide');
      }

      if (bodyErrors.length > 0) {
        res.json({
          error: bodyErrors.join(', '),
        });
      }
      const checkEvent = await Events.findOne({
        where: {
          title,
          region,
          zipCode,
          city,
          street,
          description,
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
      await Events.create({
        title,
        region,
        zipCode,
        city,
        street,
        description,
        startingTime,
        endingTime,
      });
      res.json({
        message: 'Le nouvel évènement sportif a bien été créé',
      });
    } catch (error) {
      console.log(error);
      res.json({ error: error.message });
    }
  },

  updateEvent: async (req, res) => {
    try {
      const eventId = req.params.id;
      const event = await Events.findByPk(eventId);

      if (!event) {
        res.status(404).send(`Can't find event with id ${eventId}`);
      } else {
        const {
          title,
          region,
          zipCode,
          city,
          street,
          description,
          startingTime,
          endingTime,
        } = req.body;

        if (title) event.title = title;
        if (region) event.region = region;
        if (zipCode) event.zipCode = zipCode;
        if (city) event.city = city;
        if (street) event.street = street;
        if (description) event.description = description;
        if (startingTime) event.startingTime = startingTime;
        if (endingTime) event.endingTime = endingTime;

        // Sauvegarde des champs dans la BDD.
        await event.save();
        res.json(event);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },

  // Supprime un event ciblé par l’ID.
  deleteEvent: async (req, res) => {
    try {
      const eventId = req.params.id;
      const event = await Events.findByPk(eventId);

      if (!event) {
        res.status(404).send(`Can't find event with id ${eventId}`);
      } else {
        await event.destroy();
        res.json({ message: `Event with id ${eventId} has been deleted` });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = eventCtrl;
