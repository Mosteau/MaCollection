const AbstractManager = require("./AbstractManager");

class GamesManager extends AbstractManager {
  constructor() {
    super({ table: "games" });
  }

  async getAll() {
    const [result] = await this.database.query(`SELECT * FROM ${this.table}`);
    return result;
  }

  async create({ userId, name, genre, platform, date }) {
    const formattedDate = new Date(date)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (user_id, name, genre, platform, date) VALUES (?, ?, ?, ?, ?)`,
      [userId, name, genre, platform, formattedDate]
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

  async destroy(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );
    return result;
  }

  async browseByUser(userId) {
    const [games] = await this.database.query(
      "SELECT * FROM games WHERE user_id = ?",
      [userId]
    );
    return games;
  }
}

module.exports = GamesManager;
