import getPool from "./config/mariadb.js";
import UsersRepository from "./users/users.repository.js";
import UsersService from "./users/users.service.js";
import UsersController from "./users/users.controller.js";

const buildContainer = () => {
  const pool = getPool();

  const usersRepository = new UsersRepository(pool);
  const usersService = new UsersService(usersRepository);
  const usersController = new UsersController(usersService);

  return {
    usersController,
  };
};

export default buildContainer;
