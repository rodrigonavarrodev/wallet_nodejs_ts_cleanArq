import mongooseService from "../../common/services/mongoose.service";
import mongoose from "mongoose";
import debug from "debug";

const log: debug.IDebugger = debug("app:transfers-dao");

export interface Transfer extends mongoose.Document {
  origen: string;
  destino: string;
  importe: number;
  moneda: string;
}

class TransferDao {
  Schema = mongooseService.getMongoose().Schema;

  TransferSchema = new this.Schema(
    {
      origen: String,
      destino: String,
      importe: Number,
      moneda: String,
    },
    { timestamps: true }
  );

  Transfer = mongooseService
    .getMongoose()
    .model<Transfer>("Transfers", this.TransferSchema);

  constructor() {
    log("Created new instance of StatesDao");
  }

  async saveTransfer(
    transferFields: TransfersModel.saveTransfer
  ) {
    const transfer = new this.Transfer({
      ...transferFields,
    });
    await transfer.save();
    return transfer;
  }
}

export default new TransferDao();
