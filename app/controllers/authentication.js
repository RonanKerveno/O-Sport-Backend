const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Users } = require('../models');

const authController = {

  login: async (req, res) => {
    try {
      // Récupération des informations d'identification de l'utilisateur.
      const { email, password } = req.body;

      // On vérifie si l'utilisateur avec cet email existe.
      const user = await Users.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({ error: 'Pseudo ou mot de passe incorrect' });
      }

      // On compare le mot de passe fourni avec le mot de passe hashé dans la BDD.
      const isPasswordValid = await bcrypt.compare(password, user.password);

      // Si le mot de passe n'est pas valide on retourne une erreur 400 (Bad Request).
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Pseudo ou mot de passe incorrect' });
      }

      // Identifiants OK = génération du token JWT.
      const token = jwt.sign(
        { userId: user.id, email: user.email, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        { expiresIn: '24h' },
      );

      // On envoie le token dans la réponse.
      return res.json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

};

module.exports = authController;
