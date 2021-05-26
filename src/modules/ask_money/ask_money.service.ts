import AskMoneyDao from './ask_money.dao'
import { CRUD } from "../../common/interfaces/crud.interface";
import debug from "debug";

const log: debug.IDebugger = debug("app:askmoney-service");

class AskMoneyService implements CRUD {
  async create() {
    return "";
  }

  async createAskMoney(userId: string, resource: AskMoneyModel.createAskMoney) {
    return AskMoneyDao.create(userId, resource);

  }

  async getAll() {
    return AskMoneyDao.getAll();
  }
}

export default new AskMoneyService();
