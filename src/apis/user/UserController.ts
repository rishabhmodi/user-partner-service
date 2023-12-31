import CoreUtil from "../../providers/CoreUtil";
import UserService from "./UserService";

class UserController {
  constructor() {}

  static async _signup(req, res) {
    const { body: payload } = req;

    const isUserExisting = await UserService._findUserByEmail(payload);
    if (isUserExisting) {
      res.status(403).send({ message: "User already exists!" });
    } else {
      const data = await UserService._signup(payload);

      res.cookie("jwt", data.token, {
        maxAge: 1 * 24 * 60 * 60,
        httpOnly: true,
      });
      return res.status(201).send(data);
    }
  }

  static async _signin(req, res) {
    const { body: payload } = req;
    const { password } = payload;
    const user = await UserService._findUserByEmail(payload);
    if (!user) {
      res.status(401).send({ message: "Authentication failed!" });
      return;
    }

    const isSamePassword = await CoreUtil._compareHashes(
      password,
      user.password
    );

    if (!isSamePassword) {
      res.status(401).send({ message: "Authentication failed!" });
      return;
    }

    const data = await UserService._signin(payload, user);
    res.status(200).send(data);
  }

  static async _createOrder(req, res) {
    const { body: payload } = req;

    if (!req.user) {
      return res.status(401).send({ message: "Unauthorized!!" });
    }

    if (!payload.restaurant_id) {
      return res
        .status(400)
        .send({ message: "Give the value for restaurant!!" });
    }

    if (!payload.menu_item_id) {
      return res
        .status(400)
        .send({ message: "Give the value for menu items!!" });
    }

    const data = await UserService._publishNewOrderToKafka(
      payload,
      req.user.id
    );
    res.status(200).send(data);
  }
}

export default UserController;
