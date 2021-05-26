import mongooseService from "../../common/services/mongoose.service";
import mongoose, { ObjectId } from "mongoose";
import debug from "debug";

const log: debug.IDebugger = debug("app:test-dao");

class MoneyDepositTypesDao {
  Schema = mongooseService.getMongoose().Schema;

  MoneyDepositTypeSchema = new this.Schema(
    {
      type: String,
      description: String,
      image: String,
      navigate: String
    },
    { timestamps: true }
  );

  MoneyDepositType = mongooseService
    .getMongoose()
    .model("MoneyDepositTypes", this.MoneyDepositTypeSchema);

  constructor() {
    log("Created new instance of MoneyDepositTypesDao");
  }

  async addMoneyDepositType(
    testFields: MoneyDepositTypesModel.createMoneyDepositType
  ) {
    const moneyDepositType = new this.MoneyDepositType({
      ...testFields,
    });
    await moneyDepositType.save();
    return moneyDepositType;
  }

  async getAllMoneyDepositTypes() {
    return this.MoneyDepositType.find();
  }

  async updateMoneyDepositTypes(id: any, type: string, description: string, image: string, navigate: string) {
    return this.MoneyDepositType.findOneAndUpdate(
      { _id: id },
      { $set: { tipo: type, descripcion: description, imagen: image, navigate: navigate } }
    ).exec();
  }

  async deleteMoneyDepositTypes(id: any) {
    return this.MoneyDepositType.findByIdAndDelete({ _id: id }).exec();
  }
}

export default new MoneyDepositTypesDao();
