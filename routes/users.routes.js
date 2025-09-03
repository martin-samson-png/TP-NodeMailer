import express from "express";

const usersRoutes = (usersController) => {
  const router = express.Router();
  router.post("/", (req, res, next) =>
    usersController.register(req, res, next)
  );
  router.get("/verify", (req, res, next) =>
    usersController.verifyEmail(req, res, next)
  );
  return router;
};

export default usersRoutes;
