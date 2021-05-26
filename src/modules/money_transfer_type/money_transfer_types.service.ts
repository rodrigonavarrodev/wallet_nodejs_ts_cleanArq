import MoneyTransferTypes from "./money_transfer_types.dao";
import { CRUD } from "../../common/interfaces/crud.interface";

class MoneyTransferTypesService implements CRUD {
  async create(resource: MoneyTransferTypesModel.createMoneyTransferType) {
    return MoneyTransferTypes.addMoneyTransferType(resource);
  }

  async getAll() {
    return MoneyTransferTypes.getAllMoneyTransferTypes();
  }

  async updateMoneyTransferType(id: any ,image: string, type: string, navigate: string) {
    return MoneyTransferTypes.updateMoneyTransferTypes(id, image, type, navigate);
  }

  async deleteMoneyTransferType(id: any) {
    return MoneyTransferTypes.deleteMoneyTransferTypes(id)
  }

}
export default new MoneyTransferTypesService();
