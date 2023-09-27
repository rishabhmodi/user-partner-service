import dbModels from "../../models";

class UserDAL {
  static userModel = dbModels.user;

  static async _createUser(payload) {
    return await this.userModel.create(payload);
  }

  static async _getUser(payload) {
    return await this.userModel.findAll();
  }
}

export default UserDAL;
