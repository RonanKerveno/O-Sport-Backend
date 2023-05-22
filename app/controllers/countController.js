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

const countController = {
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
    console.log(`'test 3: 'Le créateur ${event.userEvents.userName} de l'évènement avec l'identifiant ${eventId} est ajouté en tant que participant`);
  },
  */
  startCount: async (eventId, userId) => {
    try {
      const event = await Events.findByPk(eventId);
      const user = await Users.findByPk(userId);

      countController.addUserToEvent(eventId, userId);
      await user.addUserEvents(event);

      return;
    } catch (error) {
      console.log(error);
    }
  },

  countUsersFromOneEvent: async (eventId, userId) => {
    console.log('bla');
    const event = await Events.findByPk(eventId);
    if (!event) {
      console.log(`L'événement avec l'identifiant ${eventId} est introuvable`);
      return;
    }

    const maxPart = event.maxNbParticipants;
    console.log(`maxnbpart : ${maxPart}`);
    const nbUsers = Object.keys(event.eventUsers);
    console.log(`nbUsers : ${nbUsers}`);
    console.log(nbUsers.lenght);

    if ((nbUsers.length) > maxPart) {
      console.log('Le nombre maximum de participants a été atteint');
      return;
    }

    console.log(`User added as participant, son identifiants est : ${userId}`);
    console.log(`Nombre de participants actuels : ${event.eventUsers.length}`);
  },
};

module.exports = countController;
