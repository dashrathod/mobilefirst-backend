const { Kafka, logLevel } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
    logLevel: logLevel.ERROR
});


const producer = kafka.producer();


const consumer = kafka.consumer({ groupId: 'test-group' });
async function startKafka() {
    try {
        console.log("Kafka setup started...");
        
        // Connect producer
        await producer.connect();
        console.log('Kafka Producer connected');

        // Connect consumer and subscribe to topic
        await consumer.connect();
        await consumer.subscribe({ topic: 'dasharath-dev', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                let input = message.value.toString();
                if (input) {
                    input = JSON.parse(input);
                    switch (input.type) {
                        case "order-create":
                            let { userId, totalAmount, items, } = input.data;
                            await DB.Order.create({
                                userId: userId,
                                totalAmount: totalAmount,
                                items: items,
                            })
                            // send notification to socket
                            // io_socket.in(String(userId)).emit("order-notification", "New Order Created!");
                            io_socket.emit("order-notification", "New Order Created!");
                            break;
                        case "order-status-change":
                            let { orderId, status } = input.data;
                            let order = await DB.Order.findByPk(orderId);
                            if (!order) {
                                console.log('Order not found');
                                // return ({ status: false, message: 'Order Not Valid' });
                            }

                            // Update status field
                            order.status = status;

                            // Save changes
                            await order.save();
                            // send notification to socket
                            // io_socket.in(String(order.userId)).emit("order-notification", `Order Status change #${orderId} : <b>${status}</b>`);
                            io_socket.emit("order-notification", `Order Status change #${orderId} : <b>${status}</b>`);
                            break;

                        default:
                            io_socket.emit("testing", `testing from kafka - kafdrop - direct`);
                            break;
                    }
                }
            },
        });

        console.log('Kafka Consumer running');
    } catch (error) {
        console.log("ERROR in kafka setup.......\n\n", error);
    }
}

async function sendMessage(messageData) {
    await producer.send({
        topic: 'dasharath-dev',
        messages: [{ value: messageData }],
    });
}

module.exports = {
    sendMessage,
    startKafka
}