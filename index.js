const dotenv = require('dotenv');
dotenv.config();

const {
    Kafka,
    ErrorCodes, CompressionTypes,
} = require('@confluentinc/kafka-javascript').KafkaJS;

const bootstrapServer = process.env["kafka.bootstrap_server"];

const run = async () => {
    const producer = new Kafka().producer({
        'bootstrap.servers': bootstrapServer,
    });

    await producer.connect();

    const deliveryReports = await producer.send({
        topic: 'orders.kafka',
        messages: [
            { value: 'v1', key: '001' }
        ]
    });

    console.log({ deliveryReports });
    await producer.disconnect();
}

run();