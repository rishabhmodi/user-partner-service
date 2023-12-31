import dbModels from "../../models";

class DeliveryPartnerDAL {
  static deliveryPartnerModel = dbModels.deliveryPartner;

  static async _createDeliveryPartner(payload) {
    return await this.deliveryPartnerModel.create(payload);
  }

  static async _getDeliveryPartners(payload) {
    return await this.deliveryPartnerModel.findAll();
  }

  static async _getAvailableDeliveryPartners() {
    return await this.deliveryPartnerModel.findAll({
      where: { status: "available" },
    });
  }
}

export default DeliveryPartnerDAL;
