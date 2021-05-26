import amqp from 'amqplib'
import CvuAccountsService from '../../modules/cvu_accounts/cvu_accounts.service'
import debug from 'debug'

const log: debug.IDebugger = debug('app:amqp-service');

//const conn = `amqp://${process.env.AMQP_SERVER}`
const conn = `amqp://nAbulVowmhKPC79tRCtYbBDU6J5kgocz:xuoVrVECtLAqyYdB_twHORRTsIyj-JtK@rabbitmq:5672`

export async function consumeMessages() {
    try {
        const connection = await amqp.connect(conn);       
        console.log("RabbitMQ connected");
        const channel = await connection.createChannel();

        await channel.assertQueue('billetera.usercreate');
        await channel.assertQueue('billetera.userupdate');
        await channel.assertQueue('billetera.userdelete');

        //recibir el saldo cuando haya una compra o venta de cripto (userId, saldo)
        await channel.assertQueue('billetera.billeteraupdate')
       

        channel.consume('billetera.usercreate', async msg => {
            let msgReceived = JSON.parse(msg!.content.toString());
            msgReceived.email = msgReceived.userEmail;
            delete msgReceived.userEmail;
            await CvuAccountsService.create(msgReceived);
            channel.ack(msg!);
        });
       
        channel.consume('billetera.userupdate', async msg => {
            const msgReceived = JSON.parse(msg!.content.toString());
            const userId = msgReceived.userId;
            delete msgReceived.userId;
            await CvuAccountsService.updateCvuAccountById(userId, msgReceived);
            channel.ack(msg!);
        });

        channel.consume('billetera.userdelete', async msg => {
            const msgReceived = JSON.parse(msg!.content.toString());
            await CvuAccountsService.deleteCvuAccount(msgReceived);
            channel.ack(msg!);
        });

        channel.consume('billetera.billeteraupdate', async msg => {
            const msgReceived = JSON.parse(msg!.content.toString());
            const saldo = msgReceived.saldo
            const userId = msgReceived.userId;
            delete msgReceived.userId;
            await CvuAccountsService.updateCvuAmmount(userId, saldo);
            channel.ack(msg!);
        });
      

        connection.on("error", async (err) => {
            console.log(err);
            setTimeout(consumeMessages, 10000);
        });
        connection.on("close", async () => {
            console.log("connection to RabbitMQ closed!");
            setTimeout(consumeMessages, 10000);
        });

    } catch (error) {
        console.log(error);
        setTimeout(consumeMessages, 10000);
    }

}