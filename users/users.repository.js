class UsersRepository {
  constructor(pool) {
    this.pool = pool;
  }
  async getUserByEmail(email) {
    const [rows] = await this.pool.query(
      "SELECT * FROM Users WHERE email = ?",
      [email]
    );
    return rows[0] || null;
  }

  async register({ username, email, password }) {
    try {
      const [result] = await this.pool.query(
        "INSERT INTO Users (username, email, password) VALUES (?, ?, ?)",
        [username, email, password]
      );
      const insertId = result.insertId;
      const [rows] = await this.pool.query(
        "SELECT id, username, email FROM Users WHERE id = ?",
        [insertId]
      );
      return rows[0];
    } catch (err) {
      console.error(err.message);
      throw new Error("Erreur lors de la création de l'utilisateur");
    }
  }

  async getUserById(id) {
    const [rows] = await this.pool.query(
      "SELECT username FROM Users WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  async updateUserById({ id, update }) {
    try {
      const keys = Object.keys(update);
      const values = Object.values(update);
      const setKeys = keys.map((key) => `${key} = ?`).join(", ");

      await this.pool.query(`UPDATE Users SET ${setKeys} WHERE id = ?`, [
        ...values,
        id,
      ]);
      const [rows] = await this.pool.query(
        "SELECT id, username, email FROM Users WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (err) {
      console.error(err.message);
      throw new Error("Erreur lors de la mise à jour de l'utilisateur");
    }
  }
}

export default UsersRepository;
