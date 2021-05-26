import mongooseService from "../../common/services/mongoose.service";
import mongoose from "mongoose";

import debug from "debug";
import { response } from "express";
const Schema = mongoose.Schema;

const log: debug.IDebugger = debug("app:movements-dao");

export interface Movement extends mongoose.Document {
  numeroMovimiento: number;
  idOperacion: string;
  onModel: string;
  label: string;
  tipo: string;
  importe: number;
  userId: string;
  fistname: string;
  lastname: string;
}

class MovementsDao {
  Schema = mongooseService.getMongoose().Schema;

  MovementsSchema = new this.Schema(
    {
      numeroMovimiento: Number,
      idOperacion: {
        type: Schema.Types.ObjectId,
        required: true,
        // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
        // will look at the `onModel` property to find the right model.
        refPath: "onModel",
      },
      onModel: {
        type: String,
        required: true,
        enum: ["Transfers", "ExtractionOrders"],
      },
      label: {
        type: String,
        enum: ["Debito", "Credito"],
      },
      tipo: {
        type: String,
        enum: [
          "Transferencia Enviada",
          "Transferencia Recibida",
          "Orden de extraccion",
          "Acreditacion Prestamo",
          "Pago prestamo",
        ],
      },
      importe: Number,
      userId: String,
      firstname: String,
      lastname: String,
    },
    { timestamps: true }
  );

  Movement = mongooseService
    .getMongoose()
    .model<Movement>("Movements", this.MovementsSchema);

  constructor() {
    log("Created new instance of StatesDao");
  }

  async createMovement(
    movementFields: MovementModel.createMovement,
    newMovementNumber: number
  ) {
    const response = new this.Movement({
      ...movementFields,
      numeroMovimiento: newMovementNumber,
    });
    await response.save();
    return response;
  }

  async getAll() {
    return this.Movement.find().populate("idOperacion");
  }

  async getVoucherById(id: string) {
    return this.Movement.findById(id).populate("idOperacion");
  }

  async movementsCount() {
    return this.Movement.find().countDocuments();
  }

  async getAllById(userId: string) {
    return this.Movement.find({ userId: userId }).populate("idOperacion");
  }

  async getFilterMovements(userId: string, daysAgo: Date, operation: string) {
    console.log(daysAgo, operation);

    const hoy = new Date(Date.now());
    return this.Movement.find({
      $and: [
        { userId: userId },
        {
          $and: [
            { createdAt: { $gte: daysAgo, $lte: hoy } },
            { tipo: operation },
          ],
        },
      ],
    })
      .populate("idOperacion")
      .exec();
  }
}

export default new MovementsDao();
