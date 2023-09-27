import UserService from "./UserService";

class UserController {
  constructor() {}

  static async _signup(req, res) {
    const { body: payload } = req;

    const data = await UserService._signup(payload);
    res.send(data);
  }

  static async _signin(req, res) {
    const { body: payload } = req;
    const data = await UserService._signin(payload);
    res.send(data);
  }
}

export default UserController;
