import mongooseService from "../../common/services/mongoose.service";
import mongoose from "mongoose";
import debug from "debug";

const log: debug.IDebugger = debug("app:blanks-dao");

export interface MovementsFilter extends mongoose.Document {
  filtro: string;
  tipo: string;
  label: string;
}

class MovementsFilterDao {
  Schema = mongooseService.getMongoose().Schema;

  MovementsFilterSchema = new this.Schema(
    {
      filtro: String,
      tipo: String,
      label: String,
    },
    { timestamps: true }
  );

  MovementsFilter = mongooseService
    .getMongoose()
    .model<MovementsFilter>("MovementsFilters", this.MovementsFilterSchema);

  constructor() {
    log("Created new instance of StatesDao");
  }

  async create(movementsFilterFields: MovementsFilterModel.createMovementsFilter) {
    console.log(movementsFilterFields);
    
    const filter = new this.MovementsFilter({
      ...movementsFilterFields
    });
    await filter.save();
    return filter;
  }

  async getAll() {
    return this.MovementsFilter.find()
  }

  async findById(id: string) {
    return this.MovementsFilter.findOne({ _id: id })
  }

}

export default new MovementsFilterDao();
