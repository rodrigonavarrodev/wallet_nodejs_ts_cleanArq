import ExtractionOrderDao from "./extraction_order.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import cryptoRandomString, { async } from "crypto-random-string";
import CvuAccountsService from "../../modules/cvu_accounts/cvu_accounts.service";
import MovementsService from "../movements/movements.service";
import {
  publishMessage,
  checkRabbitMQconnection,
} from "../../common/services/rabbitMQpublisher.service";

class ExtractionOrderService implements CRUD {
  async create() {}

  async createOrder(
    userId: string,
    resource: ExtractionOrderModel.createExtractionOrder
  ) {
    
    let cvuAccount: any = await CvuAccountsService.getOneById(userId);
    if (resource.importe > cvuAccount.saldo) {
      return { msg: "Saldo insuficiente para realizar la orden" };
    }
    const respuesta = await this.createExtraccionOrder(userId, resource);

    //Retiene el saldo provisoriamente
    const nuevoSaldo: any = await CvuAccountsService.subtractAmmountAccount(
      userId,
      resource.importe
    );
   
    //Guardar el movimiento
    const movement = {
      idOperacion: respuesta._id,
      onModel: "ExtractionOrders",
      label: "Debito",
      tipo: "Orden de extraccion",
      importe: resource.importe,
      userId: userId,
      firstname: cvuAccount.firstname,
      lastname: cvuAccount.lastname
    };
    await MovementsService.createMovement(movement);

    //Timer
    setTimeout(this.check, 10000, userId, respuesta, resource.importe);

    return respuesta;
  }

  async check(userId: string, respuesta: any, importe: number) {
    //testeo conexion a Rabbit
    const rabbitMQcon = await checkRabbitMQconnection();
    if (rabbitMQcon.name == "Error") {
      return {
        errors: [{ msg: "Se produjo un error en la conexion con rabbitMQ" }],
      };
    }
    if (respuesta.estado === "PENDIENTE") {
      //devuelve el saldo
      await CvuAccountsService.addAmmountAccount(userId, importe);

      //Envio el saldo a cripto y prestamos
      const account: any = await CvuAccountsService.getOneById(userId);
      await publishMessage("cripto.billeteraupdate", {userId: userId, saldo: account.saldo});
      await publishMessage("prestamos.saldoupdate", {userId: userId, saldo: account.saldo});

      //cambio el estado de la orden de extraccion a cancelada
      const estado = "CANCELADA";
      await ExtractionOrderDao.updateExtractionOrderState(
        respuesta._id,
        estado
      );
      //Guardo el movimiento del reintegro de saldo
      const movement = {
        idOperacion: respuesta._id,
        onModel: "ExtractionOrders",
        label: "Credito",
        tipo: "Orden de extraccion",
        importe: importe,
        userId: userId,
        firstname: account.firstname,
      lastname: account.lastname
      };
      await MovementsService.createMovement(movement);
    }
  }

  async createExtraccionOrder(
    userId: string,
    resource: ExtractionOrderModel.createExtractionOrder
  ) {
    let pin = await this.pin();

    let orderExtractionFields = {
      userId: userId,
      pin: pin,
      importe: resource.importe,
      documento: resource.documento,
      referencia: resource.referencia,
      estado: "PENDIENTE",
    };

    return await ExtractionOrderDao.addExtractionOrder(orderExtractionFields);
  }

  async pin() {
    let pin = cryptoRandomString({ length: 8, type: "numeric" });
    return pin;
  }

  async getAll(resource: ExtractionOrderModel.getAllOrders) {
    let desde;
    let hasta;
    const documento = resource.documento;

    if (resource.desde === undefined) {
      desde = new Date("2000-01-01T00:00:00.0000z");
    } else {
      desde = new Date(resource.desde);
    }

    if (resource.hasta === undefined) {
      hasta = new Date(Date.now());
    } else {
      hasta = new Date(resource.hasta);
    }

    const orders = await ExtractionOrderDao.getAllOrders(
      desde,
      hasta,
      documento
    );
    if (orders.length === 0) {
      return { msg: "No hay ordenes de extraccion" };
    }
    return orders;
  }

  async cashOut(resource: ExtractionOrderModel.cashOut) {
    const order: any = await this.findOneByPin(
      resource.pin,
      resource.documento
    );

    if (!order) {
      return { msg: "No existe una orden con los datos ingresados" };
    }
    if (order.estado === "PENDIENTE") {
      const estado = "EXTRAIDA";
      await ExtractionOrderDao.updateExtractionOrderState(order._id, estado);
      return { msg: "Orden extraida correctamente " };
    } else {
      return {
        msg: "No se puede extraer el dinero, verifique si la orden ya fue extraida o se vencio",
      };
    }
  }

  async findOneByPin(pin: string, documento: string) {
    return ExtractionOrderDao.findOneByPin(pin, documento);
  }
}
export default new ExtractionOrderService();
