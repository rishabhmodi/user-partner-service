import jwt from "jsonwebtoken";
import Locals from "../../providers/Locals";
import UserService from "./UserService";

class UserMiddleware {
  static async _authenticateUser(req, res, next) {
    const {
      headers: { authorization },
    } = req;
    if (!authorization) {
      res.status(401).send({ message: "Unauthorized" });
      next();
    }
    const decodedToken = jwt.verify(authorization, Locals.config().appSecret);
    const userEmail = decodedToken.email;
    const existingUser = await UserService._findUserByEmail({
      email: userEmail,
    });

    if (!existingUser) {
      res.status(401).send({ message: "User not found" });
    }

    req.user = existingUser;
    next();
  }
}

export default UserMiddleware;
