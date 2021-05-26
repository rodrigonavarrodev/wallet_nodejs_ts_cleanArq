import mongooseService from "../../common/services/mongoose.service";
import mongoose, { ObjectId } from "mongoose";
import debug from "debug";

const log: debug.IDebugger = debug("app:test-dao");

class MoneyTransferTypesDao {
  Schema = mongooseService.getMongoose().Schema;

  MoneyTransferTypeSchema = new this.Schema(
    {
      image: String,
      type: String,
      navigate: String,
    },
    { timestamps: true }
  );

  MoneyTransferType = mongooseService
    .getMongoose()
    .model("MoneyTransferTypes", this.MoneyTransferTypeSchema);

  constructor() {
    log("Created new instance of MoneyTransferTypesDao");
  }

  async addMoneyTransferType(
    testFields: MoneyTransferTypesModel.createMoneyTransferType
  ) {
    const moneyTransferType = new this.MoneyTransferType({
      ...testFields,
    });
    await moneyTransferType.save();
    return moneyTransferType;
  }

  async getAllMoneyTransferTypes() {
    return this.MoneyTransferType.find();
  }

  async updateMoneyTransferTypes(id: any, image: string, type: string, navigate: string) {
    return this.MoneyTransferType.findOneAndUpdate(
      { _id: id },
      { $set: { image: image, type: type, navigate: navigate } }
    ).exec();
  }

  async deleteMoneyTransferTypes(id: any) {
    return this.MoneyTransferType.findByIdAndDelete({ _id: id }).exec();
  }
}

export default new MoneyTransferTypesDao();
