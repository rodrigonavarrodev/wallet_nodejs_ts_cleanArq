import mongooseService from "../../common/services/mongoose.service";
import mongoose, { Types } from "mongoose";
import debug from "debug";
const Schema = mongoose.Schema;

const log: debug.IDebugger = debug("app:askmoney-dao");

export interface AskMoney extends mongoose.Document {
  userId: string;
  amigoId: string;
  importe: number;
  referencia: string;
}

class AskMoneyDao {
  Schema = mongooseService.getMongoose().Schema;

  AskMoneySchema = new this.Schema(
    {
      userId: String,
      amigoId: String,
      importe: Number,
      referencia: String,
    },
    { timestamps: true }
  );

  AskMoney = mongooseService
    .getMongoose()
    .model<AskMoney>("AskMoneys", this.AskMoneySchema);

  constructor() {
    log("Created new instance of AskMoneyDao");

    this.AskMoneySchema.virtual('amigoInfo', {
      ref: 'cvuAccounts',
      localField: 'amigoId',
      foreignField: 'userId'
    });

  }

  async create(userId: string, askmoneyFields: AskMoneyModel.createAskMoney) {
    const AskMoney = new this.AskMoney({
      ...askmoneyFields,
      userId: userId,
    });
    await AskMoney.save();
    return AskMoney;
  }

  async getAll() {
    return this.AskMoney.find().populate({path: "amigoInfo", select: "email dni firstname lastname" })
  }
}

export default new AskMoneyDao();
