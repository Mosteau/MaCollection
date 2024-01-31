const AbstractManager = require("./AbstractManager");
const auth = require("../services/auth");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  async create({ firstname, lastname, email }) {
    const hashedDefault = await auth.hashAString("welcometohubidea");

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, email, password) VALUES (?, ?, ?, ?)`,
      [firstname, lastname, email, hashedDefault]
    );
    return result;
  }

  async getAll() {
    const [result] = await this.database.query(`SELECT * FROM ${this.table}`);
    return result;
  }

  async getByMail(email) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email=?`,
      [email]
    );
    return result;
  }

  async read(id) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id=?`,
      [id]
    );
    return result;
  }
}

module.exports = UserManager;
