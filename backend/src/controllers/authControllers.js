const tables = require("../tables");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await tables.user.getByMail(email);

    if (result && result[0]) {
      const user = result[0];

      if (user.password === password) {
        const userWithoutPassword = {
          id: user.id,
          email: user.email,
        };
        res.json({
          user: userWithoutPassword,
        });
      } else {
        res.status(400).send("Incorrect email or password");
      }
    } else {
      res.status(400).send("Incorrect email or password");
    }
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await tables.user.create(email, password);
    if (result.insertId) {
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(400).json({ message: "Failed to create user" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { login, signin };
