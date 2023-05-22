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

      // Durée de vie du cookie en millisecondes.
      const cookieExpiration = 24 * 60 * 60 * 1000; // 24 heures

      // On envoie le token dans un cookie httpOnly avec l'expiration.
      res.cookie('token', token, { httpOnly: true, maxAge: cookieExpiration });

      // On envoie une réponse de succès.
      return res.json({ message: 'Connexion réussie.' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  loginInfo: async (req, res) => {
    try {
      // Renvoie les informations décodées du token JWT.
      const { userId, isAdmin } = req.user;
      return res.json({ success: true, userId, isAdmin });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      // Pour supprimer le cookie coté client on l'écrase par un autre cookie qui expire de suite.
      res.cookie('token', '', { httpOnly: true, maxAge: 0 });

      // On envoie une réponse de succès.
      return res.json({ message: 'Déconnexion réussie.' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

};

module.exports = authController;
