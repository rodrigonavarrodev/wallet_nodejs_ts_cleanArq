import { CRUD } from "../../common/interfaces/crud.interface";
import debug from "debug";
import MovementsDao from "./movements.dao";
import MovementsFilterService from "../movements_filters/movements_filters.service"
import movementsController from "./movements.controller";
import { MovementsRoutes } from "./movements.routes.config";
import { invalid } from "moment";

const log: debug.IDebugger = debug("app:movements-service");

class MovementsService implements CRUD {
  async create() {
    return "";
  }

  async createMovement(resource: MovementModel.createMovement) {
    let movementNumber = await this.movementsCount();
    let newMovementNumber = movementNumber++;
    return MovementsDao.createMovement(resource, newMovementNumber);
  }

  async movementsCount() {
    return MovementsDao.movementsCount();
  }

  async getAll() {
    return MovementsDao.getAll();
  }

  async getVoucher(id: string) { 
    return await MovementsDao.getVoucherById(id)
  }

  async getAllByUserId(userId: string) {
    const movements = await MovementsDao.getAllById(userId);
    if (!movements) {
      return { msg: "No hay movimientos" };
    }
    return movements;
  }

  async getAllMovementsFriends(userId: string, cvu: string) {
    const movements: any = await MovementsDao.getAllById(userId);
    const movsWithFriends = [];

    for (let i = 0; i < movements.length; i++) {
      if (
        movements[i].idOperacion.origen == cvu ||
        movements[i].idOperacion.destino == cvu
      ) {
        console.log(movements[i]);

        movsWithFriends.push(movements[i]);
      }
    }
    if (movsWithFriends.length == 0) {
      return { msg: "No hay movimientos" };
    }
    return movsWithFriends;
  }

  async getFilterMovements(userId: string, resource: any) {

    const dias = await MovementsFilterService.findById(resource.dias) || undefined
    const tipo = await MovementsFilterService.findById(resource.tipo) || undefined

    console.log('dias', dias);
    console.log('tipo', tipo);
    
    
    let daysAgo;
    let operation;

    //Probar switch u operador ternario en lugar del IF
    if (dias === undefined) {
      daysAgo = new Date("2000-01-01T00:00:00.0000z");
    } else {
      daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - parseInt(dias.filtro));
    }

    if (tipo === undefined) {
      operation = ""
    } else {
      operation = tipo.filtro
    }

    const filterMovements = await MovementsDao.getFilterMovements(
      userId,
      daysAgo,
      operation
    );
    if (filterMovements.length == 0) {
      return { msg: "No hay movimientos para los filtros aplicados" };
    }
    return filterMovements;
  }
}

export default new MovementsService();
