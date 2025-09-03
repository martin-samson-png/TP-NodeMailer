import mysql2 from "mysql2/promise";

const getPool = () => {
  try {
    const pool = mysql2.createPool({
      host: process.env.MARIA_HOST,
      user: process.env.MARIA_USER,
      password: process.env.MARIA_PASSWORD,
      database: process.env.MARIA_DB,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    return pool;
  } catch (error) {
    console.log(error);
  }
};

export default getPool;
