const express = require("express");

const router = express.Router();

const { hashPassword } = require("./services/auth");
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const gamesControllers = require("./controllers/gamesControllers");
const authControllers = require("./controllers/authControllers");
const moviesControllers = require("./controllers/moviesControllers");

// ROAD AUTH
router.post("/login", authControllers.login);

// Road of users
router.get("/users", userControllers.browse); // OK
router.get("/users/:id", userControllers.read); // OK
router.post("/users", hashPassword, userControllers.add); // OK

// Road of games
router.get("/games", gamesControllers.browse); // OK
router.get("/games/:id", gamesControllers.read); // OK
router.post("/games", gamesControllers.add); // OK
router.delete("/games/:id", gamesControllers.destroy); // OK
router.get("/gamesByusers/:id", gamesControllers.browseByUser); // OK
router.put("/games/:id", gamesControllers.update); // OK

// Road of movies
router.get("/movies", moviesControllers.browse); // OK
router.get("/movies/:id", moviesControllers.read); // OK
router.post("/movies", moviesControllers.add); // OK
router.delete("/movies/:id", moviesControllers.destroy); // OK
router.get("/moviesByusers/:id", moviesControllers.browseByUser); // OK
router.put("/movies/:id", moviesControllers.update); // OK
/* ************************************************************************* */

module.exports = router;
