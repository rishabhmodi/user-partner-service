import dbModels from "../../models";

class UserDAL {
  static userModel = dbModels.user;

  static async _createUser(payload) {
    return await this.userModel.create(payload);
  }

  static async _findUserByEmail(email) {
    return await this.userModel.findOne({ where: { email: email } });
  }
}

export default UserDAL;
