import { DataTypes } from "sequelize";

const UserModel = (sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
      timestamps: true,
    }
  );

  return Users;
};

export default UserModel;
