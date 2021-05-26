import mongooseService from "../../common/services/mongoose.service";
import mongoose, { ObjectId } from "mongoose";
import debug from "debug";

const log: debug.IDebugger = debug("app:test-dao");

class FriendSaveTypesDao {
  Schema = mongooseService.getMongoose().Schema;

  FriendSaveTypeSchema = new this.Schema(
    {
      image: String,
      type: String,
      navigate: String,
    },
    { timestamps: true }
  );

  FriendSaveType = mongooseService
    .getMongoose()
    .model("FriendSaveTypes", this.FriendSaveTypeSchema);

  constructor() {
    log("Created new instance of FriendSaveTypesDao");
  }

  async addFriendSaveType(
    testFields: FriendSaveTypesModel.createFriendSaveType
  ) {
    const friendSaveType = new this.FriendSaveType({
      ...testFields,
    });
    await friendSaveType.save();
    return friendSaveType;
  }

  async getAllFriendSaveTypes() {
    return this.FriendSaveType.find();
  }

  async updateFriendSaveTypes(id: any, image: string, type: string, navigate: string) {
    return this.FriendSaveType.findOneAndUpdate(
      { _id: id },
      { $set: { image: image, type: type, navigate: navigate } }
    ).exec();
  }

  async deleteFriendSaveTypes(id: any) {
    return this.FriendSaveType.findByIdAndDelete({ _id: id }).exec();
  }
}

export default new FriendSaveTypesDao();
