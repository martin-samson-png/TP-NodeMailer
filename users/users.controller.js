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

  async logIn(req, res, next) {
    const { email, password } = req.body;
    try {
      const { token, user } = await this.userServices.logIn({
        email,
        password,
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(Date.now() + 3600000),
      });
      res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  }

  async getUserById(req, res, next) {
    const id = req.userID;
    try {
      const user = await this.userServices.getUserById(id);
      res.status(200).json({
        username: user.username,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async logOut(req, res) {
    res.cookie("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      expires: new Date(0),
    });
    res.status(200).json({ message: "Déconnexion réussi" });
  }

  async updateUserById(req, res, next) {
    const update = req.body;
    const currentId = req.userID;
    try {
      const updatedUser = await this.userServices.updateUserById(
        currentId,
        update
      );
      res.status(200).json({ updatedUser });
    } catch (err) {
      next(err);
    }
  }
}

export default UsersController;
