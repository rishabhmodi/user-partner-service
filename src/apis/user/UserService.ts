import CoreUtil from "../../providers/CoreUtil";
import UserDAL from "./UserDAL";

class UserService {
  static async _signup(payload) {
    try {
      return await UserDAL._createUser(payload);
    } catch (error) {
      console.log(error);
    }
  }

  static async _signin(payload) {
    try {
      return await UserDAL._getUser(payload);
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserService;
