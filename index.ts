const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const typeDefs = ` #graphql 
  # Les commentaires dans les chaînes GraphQL (comme celui-ci) commencent par le symbole dièse (#).

  # Ce type "Livre" définit les champs interrogeables pour chaque livre de notre source de données.
  tapez Livre {
    titre : Chaîne
    auteur : Chaîne
  }

  # Le type "Requête" est particulier : il liste toutes les requêtes disponibles qui
  # clients peuvent s'exécuter, ainsi que le type de retour pour chacun. Dans ce
  # cas, la requête "livres" renvoie un tableau de zéro ou plusieurs livres (défini ci-dessus).
  tapez Requête {
    livres : [Livre]
  }
` ;
const livres = [ 
    {
      titre : 'Le Réveil' , 
      auteur : 'Kate Chopin' , 
    } ,
    {
      titre : 'Cité de Verre' , 
      auteur : 'Paul Auster' , 
    } ,
  ] ;