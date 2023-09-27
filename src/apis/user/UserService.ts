import CoreUtil from "../../providers/CoreUtil";
import Locals from "../../providers/Locals";
import UserDAL from "./UserDAL";
import jwt from "jsonwebtoken";

class UserService {
  static async _findUserByEmail(payload) {
    try {
      const { email } = payload;
      return await UserDAL._findUserByEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  static async _signup(payload) {
    try {
      const finalPayload = {
        ...payload,
        id: CoreUtil._generateUUID(),
        password: await CoreUtil._generateHash(payload.password),
      };
      const user = await UserDAL._createUser(finalPayload);
      if (user) {
        let token = jwt.sign(
          { id: user.id, email: user.email, name: user.name },
          Locals.config().appSecret,
          {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
          }
        );
        return { token, email: user.email };
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async _signin(formPayload, existingUser) {
    try {
      const { email } = formPayload;
      let token = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
        },
        Locals.config().appSecret,
        {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        }
      );
      return {
        token,
        email,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserService;
