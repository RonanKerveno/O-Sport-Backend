const { Users, Events } = require('../models');

const eventUsers = {

  /**
   * @description méthode pour que le créateur d'évènement devienne aussi un des participants
   * @param {*} eventId
   * @param {*} userId
   * @returns addUserEvents
   */
  addCreatorToEvent: async (eventId, userId) => {
    try {
      const user = await Users.findByPk(userId);
      const event = await Events.findByPk(eventId);

      await user.addUserEvents(event);
      eventUsers.countUsersFromOneEvent(eventId, userId);
      return;
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * @description donne le nombre de participants à un évènement,
   * le compare au nombre maximum prédéfini
   * @param {*} eventId
   * @returns boolean
   */
  countUsersFromOneEvent: async (eventId) => {
    // Recherche de l'évènement ciblé
    const event = await Events.findByPk(
      eventId,
      {
        include: [
          {
            model: Users,
            through: 'users-join-events',
            as: 'eventUsers',
            attributes: ['userName'],
          },
        ],
      },
    );

    // Récupération du nombre max de participants à cet evt
    const maxPart = event.maxNbParticipants;
    // Récupération du nombre de participants déjà inscrits à l'instant même
    const nbUsers = event.eventUsers.length;

    if (nbUsers >= maxPart) {
      return true;
    }
    return false;
  },
};

module.exports = eventUsers;
