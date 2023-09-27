import DeliveryPartnerService from "./DeliveryPartnerService";

class DeliveryPartnerController {
  constructor() {}

  static async _createDeliveryPartner(req, res) {
    const { body: payload } = req;

    const data = await DeliveryPartnerService._createDeliveryPartner(payload);
    res.send(data);
  }

  static async _getDeliveryPartners(req, res) {
    const { body: payload } = req;
    const data = await DeliveryPartnerService._getDeliveryPartners(payload);
    res.send(data);
  }
}

export default DeliveryPartnerController;
