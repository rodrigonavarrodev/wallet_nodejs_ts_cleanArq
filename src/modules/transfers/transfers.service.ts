import { CRUD } from "../../common/interfaces/crud.interface";
import debug from "debug";
import CvuAccountsService from "../cvu_accounts/cvu_accounts.service";
import TransfersDao from "./transfers.dao";
import MovementsService from "../../modules/movements/movements.service";

const log: debug.IDebugger = debug("app:transfers-service");

class TransfersService implements CRUD {
  async create() {
    return "";
  }

  async createCvuTransfer(
    userId: string,
    resource: TransfersModel.createCvuTransfer
  ) {
    const from: any = await CvuAccountsService.getOneById(userId);
    const to: any = await CvuAccountsService.consultCvu(resource.cvu);

    if (!from) {
      return { msg: "No tenes cuenta cvu" };
    }

    if (!to) {
      return { msg: "El cvu ingresado no esta asociado a ningun usuario" };
    }

    if (from.cvu === to.cvu) {
      return { msg: "No podes hacerte una transferencia a vos mismo" };
    }

    if (
      resource.importe > from.saldo ||
      from.saldo < 0 ||
      resource.importe <= 0
    ) {
      return { msg: "Saldo insuficiente para realizar la operacion" };
    }
    //guardar transferencia
    const objectTransfer = {
      origen: from.cvu,
      destino: to.cvu,
      moneda: "ARS",
      importe: resource.importe,
    };
    const transfer = await this.saveTransfer(objectTransfer);

    //resta saldo emisor
    await CvuAccountsService.subtractAmmountAccount(
      from.userId,
      resource.importe
    );
    //suma saldo receptor
    await CvuAccountsService.addAmmountAccount(to.userId, resource.importe);

    //guardarMovimiento From
    const movementFrom = {
      idOperacion: transfer._id,
      onModel: "Transfers",
      label: "Debito",
      tipo: "Transferencia Enviada",
      importe: resource.importe,
      userId: userId,
      firstname: from.firstname,
      lastname: from.lastname
    };
    await MovementsService.createMovement(movementFrom);

    //guardarMovimiento To
    const movementTo = {
      idOperacion: transfer._id,
      onModel: "Transfers",
      label: "Credito",
      tipo: "Transferencia Recibida",
      importe: resource.importe,
      userId: to.userId,
      firstname: to.firstname,
      lastname: to.lastname
    };
    await MovementsService.createMovement(movementTo);

    return {
      msg: "Transferencia realizada con éxito",
      transfer,
    };
  }

  async createAliasTransfer(
    userId: string,
    resource: TransfersModel.createAliasTransfer
  ) {
    const from: any = await CvuAccountsService.getOneById(userId);
    const to: any = await CvuAccountsService.getOneByAlias(resource.alias);

    if (!from) {
      return { msg: "No tenes cuenta cvu" };
    }

    if (!to) {
      return { msg: "El Alias ingresado no esta asociado a ningun usuario" };
    }

    if (from.cvu === to.cvu) {
      return { msg: "No podes hacerte una transferencia a vos mismo" };
    }

    if (
      resource.importe > from.saldo ||
      from.saldo < 0 ||
      resource.importe <= 0
    ) {
      return { msg: "Saldo insuficiente para realizar la operacion" };
    }
    //guardar transferencia
    const objectTransfer = {
      //userId: from.userId,
      //origenCvu: from.cvu
      //origenAlias: from.label
      //origenName: from.name+from.lastname
      //emoresaId: from.empresaId
      //destinoCvu: to.cvu
      //destinoAlias: to.alias
      //destinoName: to.name+to.lastname
      //importe: resource.importe
      //fecha: newDate()
      //fechaConfirmacion: newDate()
      //Estado: ??
      //Interfaz: ??
      //nroOperacion: ??
      //idDispositivo: ??
      origen: from.cvu,
      destino: to.cvu,
      moneda: "ARS",
      importe: resource.importe,
    };
    const transfer = await this.saveTransfer(objectTransfer);

    //resta saldo emisor
    await CvuAccountsService.subtractAmmountAccount(
      from.userId,
      resource.importe
    );
    //suma saldo receptor
    await CvuAccountsService.addAmmountAccount(to.userId, resource.importe);

    //guardarMovimiento From
    const movementFrom = {
      idOperacion: transfer._id,
      onModel: "Transfers",
      label: "Debito",
      tipo: "Transferencia Enviada",
      importe: resource.importe,
      userId: userId,
      firstname: from.firstname,
      lastname: from.lastname
    };
    await MovementsService.createMovement(movementFrom);

    //guardarMovimiento To

    const movementTo = {
      idOperacion: transfer._id,
      onModel: "Transfers",
      label: "Credito",
      tipo: "Transferencia Recibida",
      importe: resource.importe,
      userId: to.userId,
      firstname: to.firstname,
      lastname: to.lastname
    };

    await MovementsService.createMovement(movementTo);

    return {
      msg: "Transferencia realizada con éxito",
      transfer,
    };
  }

  async saveTransfer(resource: TransfersModel.saveTransfer) {
    return await TransfersDao.saveTransfer(resource);
  }
}

export default new TransfersService();
