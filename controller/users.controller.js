class UsersController {
  constructor(userServices) {
    this.userServices = userServices;
  }

  async register(req, res, next) {
    const { username, email, password } = req.body;
    try {
      const User = await this.userServices.register({
        username,
        email,
        password,
      });
      return res.status(201).json({ User });
    } catch (err) {
      next(err);
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const { token } = req.query;
      const result = await this.userServices.verifyEmail(token);
      return res
        .status(200)
        .json({ message: "Email vérifié avec succès", email: result.email });
    } catch (err) {
      next(err);
    }
  }
}

export default UsersController;
