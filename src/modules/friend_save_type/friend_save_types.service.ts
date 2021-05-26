import FriendSaveTypes from "./friend_save_types.dao";
import { CRUD } from "../../common/interfaces/crud.interface";

class FriendSaveTypesService implements CRUD {
  async create(resource: FriendSaveTypesModel.createFriendSaveType) {
    return FriendSaveTypes.addFriendSaveType(resource);
  }

  async getAll() {
    return FriendSaveTypes.getAllFriendSaveTypes();
  }

  async updateFriendSaveType(id: any ,image: string, type: string, navigate: string) {
    return FriendSaveTypes.updateFriendSaveTypes(id, image, type, navigate);
  }

  async deleteFriendSaveType(id: any) {
    return FriendSaveTypes.deleteFriendSaveTypes(id)
  }

}
export default new FriendSaveTypesService();
