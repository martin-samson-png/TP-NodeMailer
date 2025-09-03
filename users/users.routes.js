import express from "express";
import authentification from "../middleware/authentification.js";

const usersRoutes = (usersController) => {
  const router = express.Router();
  router.post("/", (req, res, next) =>
    usersController.register(req, res, next)
  );
  router.post("/login", (req, res, next) =>
    usersController.logIn(req, res, next)
  );
  router.get("/auth", authentification, (req, res, next) =>
    usersController.getUserById(req, res, next)
  );
  router.post("/logout", (req, res) => usersController.logOut(req, res));
  router.put("/update", authentification, (req, res, next) =>
    usersController.updateUserById(req, res, next)
  );
  return router;
};

export default usersRoutes;
