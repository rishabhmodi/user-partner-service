import CoreUtil from "../../providers/CoreUtil";
import DeliveryPartnerDAL from "./DeliveryPartnerDAL";

class DeliveryPartnerService {
  static async _createDeliveryPartner(payload) {
    try {
      Object.assign(payload, { id: CoreUtil._generateUUID() });
      return await DeliveryPartnerDAL._createDeliveryPartner(payload);
    } catch (error) {
      console.log(error);
    }
  }

  static async _getDeliveryPartners(payload) {
    try {
      return await DeliveryPartnerDAL._getDeliveryPartners(payload);
    } catch (error) {
      console.log(error);
    }
  }

  static async _getAvailableDeliveryPartners() {
    try {
      return await DeliveryPartnerDAL._getAvailableDeliveryPartners();
    } catch (error) {
      console.log(error);
    }
  }
}

export default DeliveryPartnerService;
