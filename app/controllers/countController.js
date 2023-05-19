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
/*
const { Users, Events, Sports } = require('../models');

const countController = {

  startCount: () => {
    let maxPart = this.maxNbParticipants;

    for (let counter = 0; counter < (maxPart + 1);
      counter += 1) {
      console.log('counter');
    }
  },
};
*/