import amqp from 'amqplib'

import debug from 'debug'

const log: debug.IDebugger = debug('app:amqpPublish-service');

//const conn = `amqp://localhost:5672`
const conn = ``

export async function publishMessage(queue: string, msg: any) {   
    const connection = await amqp.connect(conn); 
    console.log("RabbitMQ connected");
    const channel = await connection.createChannel();
    await channel.assertQueue(queue);

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
}

export async function checkRabbitMQconnection() {
    try {
        const connection = await amqp.connect(conn);
        return connection;
    } catch (error) {
        console.log(error);
        return error;
    }

}