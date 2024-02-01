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

  async update(id, { name, genre, platform, date }) {
    const values = [name, genre, platform];
    let query = `UPDATE ${this.table} SET name=?, genre=?, platform=?`;

    if (date) {
      const formattedDate = new Date(date)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      values.push(formattedDate);
      query += `, date=?`;
    }

    query += " WHERE id=?";
    values.push(id);

    const [result] = await this.database.query(query, values);
    return result;
  }
}

module.exports = GamesManager;
