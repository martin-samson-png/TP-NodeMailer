import "dotenv/config";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});
const saltRounds = 10;

class UsersService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUserByEmail(email) {
    return await this.userRepository.getUserByEmail(email);
  }

  async register({ username, email, password }) {
    if (!username || !email || !password) {
      throw new Error("ArgumentRequired");
    }
    try {
      const user = await this.getUserByEmail(email);
      if (user) {
        throw new Error("DataAlreadyExist");
      }
      const hashPassword = await bcrypt.hash(password, saltRounds);
      const rawToken = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      const link = `http://localhost:3000/users/verify?token=${rawToken}`;

      await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: "Confirm your email",
        text: "Pour confirmer l'email, cliquez sur le liens : ",
        html: `
      <h1>Bienvenue sur MonApp</h1>
      <p>Pour confirmer l'inscription, clique ici :</p>
      <p><a href="${link}">Confirmer mon inscription</a></p>
    `,
      });
      const newUser = await this.userRepository.register({
        username,
        email,
        password: hashPassword,
        rawToken,
      });
      return newUser;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async verifyEmail(rawToken) {
    if (!rawToken) {
      throw new Error("ArgumentRequired");
    }
    try {
      await jwt.verify(rawToken, process.env.JWT_SECRET);
      const data = await this.userRepository.verifyRawToken(rawToken);
      if (!data) {
        throw new Error("DataNotFound");
      }
      return await this.userRepository.verifyEmail(rawToken);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default UsersService;
