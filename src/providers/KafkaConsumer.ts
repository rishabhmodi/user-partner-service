import { Consumer, KafkaClient, Message } from "kafka-node";

class KafkaConsumer {
  private consumer: Consumer;

  constructor(topic: string) {
    const client = new KafkaClient({ kafkaHost: "localhost:9092" });
    this.consumer = new Consumer(client, [{ topic, partition: 0, offset: 0 }], {
      autoCommit: true,
    });

    this.consumer.on("message", (message: Message) => {
      try {
        const parsedMessage = JSON.parse(message.value as string);
        console.log(parsedMessage, "***parsed message");
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
