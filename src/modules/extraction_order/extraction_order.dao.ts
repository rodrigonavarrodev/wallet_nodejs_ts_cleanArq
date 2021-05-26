import mongooseService from "../../common/services/mongoose.service";
import mongoose, { ObjectId } from "mongoose";
import debug from "debug";

const log: debug.IDebugger = debug("app:test-dao");

export interface ExtractionOrder extends mongoose.Document {
  userId: string;
  pin: string;
  importe: number;
  documento: string;
  referencia: string;
  estado: string;
}

class ExtractionOrderDao {
  Schema = mongooseService.getMongoose().Schema;

  ExtractionOrderSchema = new this.Schema(
    {
      userId: String,
      pin: String,
      importe: Number,
      documento: String,
      referencia: String,
      estado: String,
    },
    { timestamps: true }
  );

  ExtractionOrder = mongooseService
    .getMongoose()
    .model("ExtractionOrders", this.ExtractionOrderSchema);

  constructor() {
    log("Created new instance of ExtractionOrderDao");
  }

  async addExtractionOrder(
    testFields: ExtractionOrderModel.createExtractionOrder
  ) {
    const ExtractionOrder = new this.ExtractionOrder({
      ...testFields,
    });
    await ExtractionOrder.save();
    return ExtractionOrder;
  }

  async updateExtractionOrderState(id: string, estado: string) {
    return this.ExtractionOrder.findOneAndUpdate(
      { _id: id },
      { $set: { estado: estado } }
    ).exec();
  }

  async getAllOrders(desde: Date, hasta: Date, documento: string) {
    return this.ExtractionOrder.find({
      $or: [{ documento: null }, { createdAt: { $gte: desde, $lte: hasta } }],
    }).exec();
  }

  async findOneByPin(pin: string, documento: string) {
    return this.ExtractionOrder.findOne({
      $and: [{ pin: pin }, { documento: documento }],
    }).exec();
  }
}

export default new ExtractionOrderDao();
