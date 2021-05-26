import mongooseService from "../../common/services/mongoose.service";
import mongoose from "mongoose";
import debug from "debug";
const Schema = mongoose.Schema;

const log: debug.IDebugger = debug("app:cvuaccountsbo-dao");

export interface cvuAccountBO extends mongoose.Document {

}

class CvuAccountsBODao {
  Schema = mongooseService.getMongoose().Schema;

  cvuAccountsBOSchema = new this.Schema(
  );

  cvuAccountBO = mongooseService
    .getMongoose()
    .model("Cvuaccountsbo", this.cvuAccountsBOSchema);

  constructor() {
    log("Created new instance of CvuAccountsBODao");
  }
  
}

export default new CvuAccountsBODao();
