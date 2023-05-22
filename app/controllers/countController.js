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

  participants: [],

  startCount: async (eventId) => {
    console.log(eventId);
    const event = await Events.findByPk(
      eventId,
      {
        include: [
          {
            model: Users,
            as: 'userEvents',
            through: 'users_join_events',
            attributes: ['id', 'userName'],
          },
        ],
      },
    );
    if (!event) {
      console.log(`L'événement avec l'identifiant ${eventId} est introuvable`);
      return;
    }
    countController.participants.push(event.userId);
    console.log(`test 1: ${countController.participants}`);
    console.log(`test 2: ${event.eventUsers.userId}`);
    console.log(`'test 3: 'Le créateur ${event.userEvents.userName} de l'évènement avec l'identifiant ${eventId} est ajouté en tant que participant`);
  },

  addUserToEvent: async (eventId, userId) => {
    console.log('bla');
    const event = await Events.findByPk(eventId);
    if (!event) {
      console.log(`L'événement avec l'identifiant ${eventId} est introuvable`);
      return;
    }

    const maxPart = event.maxNbParticipants;

    if (countController.participants.length >= maxPart) {
      console.log('Le nombre maximum de participants a été atteint');
      return;
    }

    countController.participants.push(userId);
    console.log('User added as participant');
    console.log(`Nombre de participants actuels : ${countController.participants.length}`);
  },
};

module.exports = countController;
