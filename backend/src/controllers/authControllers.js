const argon2 = require("argon2");

const tables = require("../tables");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await tables.user.getByMail(email);

    if (result == null) {
      res.sendStatus(422);
      return;
    }
    const verified = await argon2.verify(result.password, password);
    if (verified) {
      delete result.password;
      res.json(result);
    } else {
      res.status(422).send("Email or password incorrect");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { login };
