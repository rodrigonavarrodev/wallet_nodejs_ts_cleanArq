import CvuAccountsDao from "./cvu_accounts.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import loginBindService from "../../common/services/bind.service";
import cryptoRandomString, { async } from "crypto-random-string";
import randomWords from "random-words";

class CvuAccountsService implements CRUD {
  async create(resource: cvuAccountsModel.createUserCvu) {
    return CvuAccountsDao.addUserCvu(resource);
  }

  async updateCvuAccountById(userId: string, resource: any) {
    const token = await loginBindService.loginBind();
    const bindId = await this.pin();
    // Obtengo CVUdel Bind
    const cvu = await loginBindService.cvuAlias(token, bindId);

    const alias = await this.genAlias();
    return CvuAccountsDao.updateCvuAccountById(
      userId,
      resource,
      cvu.cvu,
      alias
    );
  }

  async deleteCvuAccount(resource: cvuAccountsModel.deleteCvuAccount) {
    return CvuAccountsDao.deleteCvuAccount(resource.userId);
  }

  async addCvu(resource: cvuAccountsModel.addCvu) {
    return CvuAccountsDao.addCvu(resource);
  }

  async getAll() {
    return CvuAccountsDao.getAllCvus();
  }

  async cvuObject() {
    //para armar el objeto que se le pasa a create cvu
  }

  async getOneById(userId: string) {
    return CvuAccountsDao.getOneById(userId);
  }

  async getOneByAlias(alias: string) {
    return CvuAccountsDao.getOneCvuAlias(alias);
  }

  async updateCvuAlias(alias: string, userId: string) {
    const nuevoAlias: any = await this.getOneByAlias(alias);

    if (nuevoAlias.alias === alias) {
      return { msg: "El alias ingresado ya existe, elija otro" };
    }
    await CvuAccountsDao.updateCvuAlias(alias, userId);
    return { msg: "El alias se actualizo correctamente" };
  }

  async consultCvu(to: string) {
    return CvuAccountsDao.consultCvuByCvu(to);
  }

  async addAmmountAccount(userId: string, importe: number) {
    const ammount: any = await this.getOneById(userId);
    const newAmmount = ammount.saldo + importe;
    return CvuAccountsDao.updateAmmount(userId, newAmmount);
  }

  async subtractAmmountAccount(userId: string, importe: number) {
    const ammount: any = await this.getOneById(userId);
    const newAmmount = ammount.saldo - importe;
    return CvuAccountsDao.updateAmmount(userId, newAmmount);
  }

  async addFriend(userId: string, friend: cvuAccountsModel.addFriend) {
    const account: any = await this.getOneById(userId);

    //recorrer el arreglo de amigos y fijarse que ya no exista para no repetirlo
    for (let i = 0; i < account.amigos.length; i++) {
      if (account.amigos[i].idAmigo == friend.idAmigo) {
        return { msg: "Ya es tu amigo" };
      }

      if (account.amigos[i].apodo == friend.apodo) {
        return { msg: "Ya tenes un amigo con ese apodo, ingrese" };
      }
    }
    account.amigos.push(friend);
    await CvuAccountsDao.updateAccount(userId, account.amigos);
    return { msg: "Amigo agregado correctamente" };
  }

  async getAllFriends(userId: string) {
    const response: any = await CvuAccountsDao.getOneById(userId);

    if (response.length === 0) {
      return { msg: "No tiene amigos agregados" };
    }
    // ver como poblar el id del amigo
    const friends = [];
    for (let i = 0; i < response.amigos.length; i++) {
      const element = response.amigos[i].idAmigo;
      const apodo = response.amigos[i];
      const friend: any = await CvuAccountsDao.getOneById(element);
      const friendObject = {
        userId: friend.userId,
        nombre: friend.firstname,
        apeliido: friend.lastname,
        email: friend.email,
        apodo: apodo.apodo,
        dni: friend.dni,
        cvu: friend.cvu,
        alias: friend.alias,
        //profilePic: friend.profilePic,
      };
      friends.push(friendObject);
    }

    return { amigos: friends };
  }

  async deleteFriend(idAmigo: string, userId: string) {
    const response: any = await CvuAccountsDao.getOneById(userId);

    for (let i = 0; i < response.amigos.length; i++) {
      if (response.amigos[i].idAmigo == idAmigo) {
        response.amigos.splice(i, 1);
      }
    }
    await CvuAccountsDao.updateAccount(userId, response.amigos);
    return { msg: "Amigo eliminado correctamente" };
  }

  async modifyFriendNickname(idAmigo: string, userId: string, apodo: string) {
    const response: any = await CvuAccountsDao.getOneById(userId);
    for (let i = 0; i < response.amigos.length; i++) {
      const element = response.amigos[i];
      if (response.amigos[i].idAmigo == idAmigo) {
        response.amigos[i].apodo = apodo;
      }
    }
    await CvuAccountsDao.updateAccount(userId, response.amigos);
    return { msg: "Apodo modificado correctamente" };
  }

  async pin() {
    let pin = cryptoRandomString({ length: 5, type: "numeric" });
    return pin;
  }

  async genAlias() {
    let inicial = await randomWords();
    let middle = await randomWords();
    let final = await randomWords();
    let alias = inicial + "." + middle + "." + final;
    return alias.toUpperCase();
  }

  async updateCvuAmmount(userId: string, saldo: number) {
    return CvuAccountsDao.updateAmmount(userId, saldo);
  }

  async createFundCvu(resource: cvuAccountsModel.createFundCvu){
    const to: any = await CvuAccountsDao.consultCvuByCvu(resource.cvu);
    if (!to) {
      throw { msg: "El cvu ingresado no esta asociado a ningun usuario" };
    }
    await this.addAmmountAccount(to.userId, resource.importe);
    const data = await CvuAccountsDao.getOneById(to.userId);

    return data;

  }

}
export default new CvuAccountsService();
