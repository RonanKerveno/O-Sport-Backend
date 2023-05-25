const fetch = require('node-fetch');

const location = {
  fetchOptions: {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
  },

  /**
   * @description - appelle toutes les régions de France dans l'API
   * @returns [{name and code}]
   */
  async getAllRegions() {
    try {
      const response = await fetch('http://geo.api.gouv.fr/regions', this.fetchOptions);
      const regions = await response.json();
      if (!response.ok) {
        throw new Error('An error occurred during the HTTP request');
      }
      console.log(regions);
      // afficher les régions dans le DOM
      // l'utilisateur clique sur la région choisie
      // cela enregistre le code de cette région et
      // déclenche 'getAlldepartmentsFromOneRegion(codeRegion)'
      location.getAlldepartmentsFromOneRegion(76);
    } catch (error) {
      console.log(error);
    }
  },

  /**
   *
   * @description va chercher les départements de la région (codeRegion)
   * @param {*} codeRegion
   * @return [{nom, code}]
   */
  async getAlldepartmentsFromOneRegion(codeRegion) {
    try {
      const response = await fetch(`http://geo.api.gouv.fr/regions/${codeRegion}/departements?fields=nom,code`, this.fetchOptions);
      const dpts = await response.json();
      if (!response.ok) {
        throw new Error('An error occurred during the HTTP request');
      }
      console.log(dpts);
      // Stratégie
      // afficher les départements dans le DOM
      // l'utilisateur clique sur le dpt choisi
      // cela enregistre le code de ce dpt et
      // déclenche 'getAllZipCodeAndCitiesFromOneDepartment(codeDpt)'
      location.getAllZipCodeAndCitiesFromOneDepartment(66);
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * @description va chercher les communes et les codes postaux du département demandé (codeDpt)
   * @param {*} codeDpt
   * @return [{nom, codes postaux, code commune}]
   */
  async getAllZipCodeAndCitiesFromOneDepartment(codeDpt) {
    try {
      const response = await fetch(`https://geo.api.gouv.fr/departements/${codeDpt}/communes?fields=nom,codesPostaux`, this.fetchOptions);
      const cities$zip = await response.json();
      if (!response.ok) {
        throw new Error('An error occurred during the HTTP request');
      }
      // console.log(cities$zip.slice(0, 10));
      // console.log('ArrayCount : ', JSON.stringify(cities$zip, null, 2));
      // liste des noms des communes
      cities$zip.forEach((element) => {
        console.log('Liste des communes :', element.nom);
      });
      // liste des codes postaux
      cities$zip.forEach((element) => {
        console.log('Liste des codes postaux :', element.codesPostaux);
      });
      // Stratégie
      // afficher les codes postaux et villes dans le DOM
      // l'utilisateur clique sur le code postal et la ville choisie
      // cela fixe ses choix dans l'input
      // y a plus qu'à appuyer sur le bouton 'valider' de la page
      // pour envoyer toutes les infos
    } catch (error) {
      console.log(error);
    }
  },

  // curl 'https://geo.api.gouv.fr/communes?codePostal=78000'
};

module.exports = location;
