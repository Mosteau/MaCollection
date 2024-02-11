const AbstracManager = require("./AbstractManager");

class MoviesManager extends AbstracManager {
  constructor() {
    super({ table: "movies" });
  }

  async getAll() {
    const [result] = await this.database.query(`SELECT * FROM ${this.table}`);
    return result;
  }

  async create({ name, genre, date }) {
    const formattedDate = new Date(date)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, genre, date) VALUES (?, ?, ?)`,
      [name, genre, formattedDate]
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
    const [movies] = await this.database.query(
      "SELECT * FROM movies WHERE user_id = ?",
      [userId]
    );
    return movies;
  }

  async update(id, { name, genre, date }) {
    const values = [name, genre];
    let query = `UPDATE ${this.table} SET name=?, genre=?`;

    if (date) {
      const formattedDate = new Date(date)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      values.push(formattedDate);
      query += `, date=?`;
    }

    query += ` WHERE id=?`;
    values.push(id);

    const [result] = await this.database.query(query, values);
    return result;
  }
}

module.exports = MoviesManager;
