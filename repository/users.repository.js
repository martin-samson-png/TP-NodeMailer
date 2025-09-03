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

  async verifyRawToken(rawToken) {
    const [rows] = await this.pool.query(
      "SELECT id, username, email FROM Users WHERE rawToken=? AND isVerified=0",
      [rawToken]
    );

    if (!rows || rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  async verifyEmail(rawToken) {
    await this.pool.query(
      "UPDATE Users SET isVerified = 1, rawToken=NULL WHERE rawToken=? AND isVerified=0",
      [rawToken]
    );
  }

  async register({ username, email, password, rawToken }) {
    try {
      const [result] = await this.pool.query(
        "INSERT INTO Users (username, email, password, rawToken) VALUES (?, ?, ?, ?)",
        [username, email, password, rawToken]
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
}

export default UsersRepository;
