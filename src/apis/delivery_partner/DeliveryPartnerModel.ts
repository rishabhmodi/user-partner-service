import { DataTypes } from "sequelize";

const DeliveryPartnerModel = (sequelize) => {
  const DeliveryPartners = sequelize.define(
    "deliveryPartners",
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
      status: {
        type: DataTypes.ENUM("offline", "available", "in_flight_order"),
        defaultValue: "available",
      },
    },
    {
      underscored: true,
      timestamps: true,
    }
  );

  return DeliveryPartners;
};

export default DeliveryPartnerModel;
