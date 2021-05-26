import express from "express";
import CvuAccountsService from "./cvu_accounts.service";
import { publishMessage, checkRabbitMQconnection } from '../../common/services/rabbitMQpublisher.service'

import debug from "debug";

const log: debug.IDebugger = debug("app:billetera-controller");

class CvuAccountsController {
  async getAllCvus(req: express.Request, res: express.Response) {
    try {
      const cvus = await CvuAccountsService.getAll();
      if (cvus.length === 0) {
        return res.status(200).send({ msg: "No hay registros" });
      }
      return res.status(200).send(cvus);
    } catch (error) {
      return res.status(400).send({ errors: [error] });
    }
  }

  async getCvu(req: express.Request, res: express.Response) {
    try {
      const cvu = await CvuAccountsService.getOneById(req.jwt.userId);
      if (!cvu) {
        return res
          .status(200)
          .send({ msg: "No hay datos asociados para el usuario ingresado" });
      }
      return res.status(200).send(cvu);
    } catch (error) {
      return res.status(400).send({ errors: [error] });
    }
  }

  async getCvuSaldo(req: express.Request, res: express.Response) {
    try {
      const cvu: any = await CvuAccountsService.getOneById(req.jwt.userId);
      if (!cvu) {
        return res
          .status(200)
          .send({ msg: "No hay datos asociados para el usuario ingresado" });
      }
      return res.status(200).send({ saldo: cvu.saldo });
    } catch (error) {
      return res.status(400).send({ errors: [error] });
    }
  }

  async getCvuQr(req: express.Request, res: express.Response) {
    try {
      const cvu: any = await CvuAccountsService.getOneById(req.jwt.userId);
      if (!cvu) {
        return res
          .status(200)
          .send({ msg: "No hay datos asociados para el usuario ingresado" });
      }
      return res
        .status(200)
        .send({ cvu: cvu.cvu, alias: cvu.alias, dni: cvu.dni });
    } catch (error) {
      return res.status(400).send({ errors: [error] });
    }
  }

  async updateAlias(req: express.Request, res: express.Response) {
    try {
      const alias = await CvuAccountsService.updateCvuAlias(req.jwt.userId, req.body.alias);
      return res.status(200).send(alias);
    } catch (error) {
      return res.status(400).send({ errors: [error] });
    }
  }


  async cvusBalance(req: express.Request, res: express.Response) {
    let balance = await CvuAccountsService.getAll();

    const extractAmmount = balance.map(function (x: any) {
      return x.saldo;
    });

    const totalBalance = extractAmmount.reduce(function (x, y) {
      return parseInt(x) + parseInt(y);
    });

    return res.status(200).send({ saldoRecaudador: totalBalance });
  }

  async addFriend(req: express.Request, res: express.Response) {
    try {
      const friend = await CvuAccountsService.addFriend(req.jwt.userId, req.body);
      return res.status(200).send(friend);
    } catch (error) {
      return res.status(400).send({ errors: [error] });
    }
  }

  async deleteFriend(req: express.Request, res: express.Response) {
    try {
      await CvuAccountsService.deleteFriend(req.params.idAmigo, req.jwt.userId );
      return res.status(200).send({ msg: 'Amigo eliminado correctamente.' });
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async modifyNickname(req: express.Request, res: express.Response) {
    try {
      const response = await CvuAccountsService.modifyFriendNickname(req.params.idAmigo, req.jwt.userId, req.body.apodo );
      return res.status(200).send(response);
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async getAllFriends(req: express.Request, res: express.Response) {
    try {
      const response = await CvuAccountsService.getAllFriends(req.jwt.userId);
      return res.status(200).send(response);
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  async cvuDestination(req: express.Request, res: express.Response) {
    try {
      const cvu = await CvuAccountsService.consultCvu(req.body.cvu);
      if (!cvu) {
        return res
          .status(200)
          .send({ msg: "No hay datos asociados para el cvu ingresado" });
      }
      return res.status(200).send(cvu);
    } catch (error) {
      return res.status(400).send({ errors: [error] });
    }
  }

  async aliasDestination(req: express.Request, res: express.Response) {
    try {
      const alias = await CvuAccountsService.getOneByAlias(req.body.alias);
      if (!alias) {
        return res
          .status(200)
          .send({ msg: "No hay datos asociados para el alias ingresado" });
      }
      return res.status(200).send(alias);
    } catch (error) {
      return res.status(400).send({ errors: [error] });
    }
  }


  async fundCvu(req: express.Request, res: express.Response) {
    try {
      const rabbitMQcon = await checkRabbitMQconnection();
      if (rabbitMQcon.name == 'Error') {
        return res.status(400).send({ errors: [{ msg: "Se produjo un error en la conexion con rabbitMQ" }] });
      }
      const data = await CvuAccountsService.createFundCvu(req.body);
      //Send saldo to cripto
      await publishMessage('cripto.billeteraupdate', {userId: data!.userId, saldo: data!.saldo});

      return res.status(200).send({ msg: "Se fondeo la cuenta correctamente"});
    } catch (error) {
      if (error.msg) {
        return res.status(400).send({ errors: [error] });
      } else {
        return res.status(400).send({ errors: [error.message] });
      }
    }
  }

  
}

export default new CvuAccountsController();
