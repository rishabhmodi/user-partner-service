import { Consumer, KafkaClient, Message } from "kafka-node";
import DeliveryPartnerService from "../apis/delivery_partner/DeliveryPartnerService";
import KafkaProducer from "./KafkaProducer";

const producer = new KafkaProducer();

class KafkaConsumer {
  private consumer: Consumer;

  constructor(topic: string) {
    const client = new KafkaClient({ kafkaHost: "localhost:9092" });
    this.consumer = new Consumer(client, [{ topic, partition: 0, offset: 0 }], {
      autoCommit: true,
    });

    this.consumer.on("message", async (message: Message) => {
      try {
        const parsedMessage = JSON.parse(message.value as string);
        const { orderStatus } = parsedMessage;
        switch (orderStatus) {
          case "ASSIGN_DELIVERY_PARTNER": {
            const availablePartner =
              await DeliveryPartnerService._getAvailableDeliveryPartners();
            const kafkaPayload = {
              availableDeliveryPartnerId:
                availablePartner.length > 0 ? availablePartner[0].id : [],
              ...parsedMessage,
              orderStatus: "LIST_OF_AVAILABLE_PARTNERS",
            };
            producer.produceMessage("order-stream", kafkaPayload);
            break;
          }
        }
      } catch (err) {
        console.log("error parsing message", err);
      }
    });

    this.consumer.on("error", (err) => {
      console.error("Kafka consumer error:", err);
    });
  }
}

export default KafkaConsumer;
