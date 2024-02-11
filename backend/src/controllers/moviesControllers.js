const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const movies = await tables.movies.getAll();
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const movie = await tables.movies.read(req.params.id);
    if (movie == null) {
      res.sendStatus(404);
    } else {
      res.json(movie);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const movie = req.body;
  try {
    const insertId = await tables.movies.create(movie);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.movies.destroy(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const browseByUser = async (req, res, next) => {
  try {
    const movies = await tables.movies.browseByUser(req.params.id);
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const movie = req.body;
  try {
    await tables.movies.update(req.params.id, movie);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  add,
  destroy,
  update,
  browseByUser,
};
