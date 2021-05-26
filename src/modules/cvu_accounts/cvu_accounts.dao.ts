import mongooseService from "../../common/services/mongoose.service";
import mongoose from "mongoose";
import debug from "debug";
const Schema = mongoose.Schema;

const log: debug.IDebugger = debug("app:cvuaccounts-dao");

export interface cvuAccount extends mongoose.Document {
  idBt: string;
  userId: string;
  dni: string;
  cvu: string;
  alias: string;
  saldo: number;
  firstname: string;
  lastname: string;
  email: string;
  empresaId: string;
  //profilePic: string;
  amigos: any;
}

class CvuAccountsDao {
  Schema = mongooseService.getMongoose().Schema;

  cvuAccountsSchema = new this.Schema(
    {
      idBt: String,
      userId: String,
      dni: String,
      cvu: String,
      alias: String,
      saldo: Number,
      firstname: String,
      lastname: String,
      email: String,
      empresaId: String,
      //profilePic: String,
      amigos: [
        {
          idAmigo: { type: Schema.Types.ObjectId, ref: "cvuAccounts" },
          apodo: String,
          _id: false,
        },
      ],
    },
    { timestamps: true }
  );

  cvuAccount = mongooseService
    .getMongoose()
    .model<cvuAccount>("cvuAccounts", this.cvuAccountsSchema);

  constructor() {
    log("Created new instance of CvuAccountsDao");
  }

  async addUserCvu(accountCvuFields: cvuAccountsModel.createUserCvu) {
    const account = new this.cvuAccount({
      ...accountCvuFields,
      idBt: '',
      dni: '',
      cvu: '',
      alias: '',
      saldo: 0,
      firstname: '',
      lastname: '',
      //profilePic: '',
      amigos: []
    })
    await account.save();
    return account;
  }

  async updateCvuAccountById(id: string, accountsFields: any, cvu: string, alias: string) {
      
     const account = await this.cvuAccount
    .findOneAndUpdate(
      { userId: id },
      { $set: accountsFields, cvu: cvu, alias: alias },
      { new: true }
    ).exec();

    return account;
  }
  
  async deleteCvuAccount(userId: string) {
    return this.cvuAccount.deleteOne({ userId: userId }).exec();
  }


  async addCvu(testFields: cvuAccountsModel.addCvu) {
    const cvu = new this.cvuAccount({
      ...testFields,
      saldo: "",
      cvu: "",
      alias: "",
      amigos: "",
    });
    await cvu.save();
    return cvu;
  }

  async getAllCvus() {
    return this.cvuAccount.find();
  }

  async getOneCvu(userId: string) {
    return this.cvuAccount.findOne({ userId: userId }).exec();
  }

  async getOneCvuAlias(alias: string) {
    return this.cvuAccount.findOne({ alias: alias }).exec();
  }

  async getOneById(userId: string) {
    return this.cvuAccount.findOne({ userId: userId }).exec();
  }

  async updateCvuAlias(alias: string, userId: string) {
    return this.cvuAccount
      .findOneAndUpdate({ userId: userId }, { $set: { alias: alias } })
      .exec();
  }

  async consultCvuByCvu(to: string) {
    return this.cvuAccount.findOne({ cvu: to }).exec();
  }

  async updateAmmount(userId: string, saldo: number) {
    return this.cvuAccount
      .findOneAndUpdate({ userId: userId }, { $set: { saldo: saldo } })
      .exec();
  }

  async updateAccount(userId: string, amigos: any) {
    return await this.cvuAccount
      .findOneAndUpdate(
        { userId: userId },
        { $set: { amigos: amigos } },
        { new: true }
      )
      .exec();
  }
}

export default new CvuAccountsDao();
