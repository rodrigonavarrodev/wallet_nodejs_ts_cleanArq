import MoneyDepositTypes from "./money_deposit_types.dao";
import { CRUD } from "../../common/interfaces/crud.interface";

class MoneyDepositTypesService implements CRUD {
  async create(resource: MoneyDepositTypesModel.createMoneyDepositType) {
    return MoneyDepositTypes.addMoneyDepositType(resource);
  }

  async getAll() {
    return MoneyDepositTypes.getAllMoneyDepositTypes();
  }

  async updateMoneyDepositType(id: any, type: string, description: string, image: string, navigate: string) {
    return MoneyDepositTypes.updateMoneyDepositTypes(id, type, description, image, navigate);
  }

  async deleteMoneyDepositType(id: any) {
    return MoneyDepositTypes.deleteMoneyDepositTypes(id)
  }

}
export default new MoneyDepositTypesService();
