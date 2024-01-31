const errorManager = (req, res) => {
  res.status(500).send("Internal Server Error");
};

module.exports = errorManager;
