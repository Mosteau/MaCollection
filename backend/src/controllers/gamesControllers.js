const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const games = await tables.games.getAll();
    res.json(games);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const game = await tables.games.read(req.params.id);
    if (game == null) {
      res.sendStatus(404);
    } else {
      res.json(game);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const game = req.body;
  try {
    const insertId = await tables.games.create(game);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.games.destroy(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const browseByUser = async (req, res, next) => {
  try {
    const games = await tables.games.browseByUser(req.params.id);
    res.json(games);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  add,
  read,
  destroy,
  browseByUser,
};
