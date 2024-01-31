const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const gamesControllers = require("./controllers/gamesControllers");
const authControllers = require("./controllers/authControllers");
// const { verifyToken } = require("./services/auth");

// ROAD AUTH
router.post("/login", authControllers.login);
router.post("/signin", authControllers.signin);

// Auth wall
// router.use(verifyToken);

// Road of users
router.get("/users", userControllers.browse); // OK
router.get("/users/:id", userControllers.read); // OK
// router.get("/users-by-token", userControllers.readByToken);
router.post("/users", userControllers.add); // OK

// Road of games
router.get("/games", gamesControllers.browse); // OK
router.get("/games/:id", gamesControllers.read); // OK
router.post("/games", gamesControllers.add); // OK
router.delete("/games/:id", gamesControllers.destroy); // OK

/* ************************************************************************* */

module.exports = router;
