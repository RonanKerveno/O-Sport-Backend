/* Le user créateur de l'évènement doit s'ajouter automatiquement dans la liste des participants.
Chaque évènement a un nombre maximun de participants.
Un compteur se met en route dès la création de l'évènement.
On ne peut plus s'ajouter en participant si le compteur est au max.

Quand tu crées un event --> nb max participants défini.
compteur participants = 1(créateur évènement).
Quand un user s'inscrit à l'évènement, il incrémente le compteur.
Celui ci s'arrête au max défini.
Les users voient les chiffres sur l'event.
paricipants = user_id et creator_id
*/

const { Users, Events } = require('../models');

const eventUsers = {
  /*
  startCount: async (eventId, creatorId) => {
    console.log(eventId);
    console.log(creatorId);

    const event = await Events.findByPk(
      eventId,
      {
        include: [
          {
            model: Users,
            through: 'users_join_events',
            as: 'userEvents',
            attributes: ['id', 'userName'],
          },
        ],
      },
    );
    console.log(userName);

    if (!event) {
      console.log(`L'événement avec l'identifiant ${eventId} est introuvable`);
      return;
    }
    countController.participants.push(event.userId);
    console.log(`test 1: ${countController.participants}`);
    console.log(`test 2: ${event.eventUsers.userId}`);
    console.log(`'test 3: 'Le créateur ${event.userEvents
    .userName} de l'évènement avec l'identifiant ${eventId}
    est ajouté en tant que participant`);
  },
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

    console.log('ArrayCount : ', JSON.stringify(event, null, 2));
    // Récupération du nombre max de participants à cet evt
    const maxPart = event.maxNbParticipants;
    console.log(`nb max de participants : ${maxPart}`);
    // Récupération du nombre de participants déjà inscrits à l'instant même
    const nbUsers = event.eventUsers.length;
    console.log('Compteur : ', nbUsers);

    if (nbUsers >= maxPart) {
      return true;
    }
    return false;
  },
};

module.exports = eventUsers;
