import { Consumer, KafkaClient } from "kafka-node";

class KafkaConsumer {
  private consumer: Consumer;

  constructor(topic: string) {
    const client = new KafkaClient({ kafkaHost: "localhost:9092" });
    this.consumer = new Consumer(client, [{ topic }], { autoCommit: true });

    this.consumer.on("message", (message) => {
      console.log("Received message:", message.value);
    });

    this.consumer.on("error", (err) => {
      console.error("Kafka consumer error:", err);
    });
  }
}

export default KafkaConsumer;
