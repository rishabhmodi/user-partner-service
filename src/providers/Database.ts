import dbModels from "../models";

export class Database {
  public static init(): any {
    dbModels.sequelize
      .sync({ force: true })
      .then(() => {
        console.log("User Partner Db Synced...");
      })
      .catch((err) => {
        console.log("Failed User Partner Db Sync...", err);
      });
  }
}

export default Database;
