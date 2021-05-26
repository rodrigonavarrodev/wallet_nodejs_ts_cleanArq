import axios from "axios";

class loginBindService {
  constructor() {}

  async loginBind() {
    try {
      let login = await axios({
        method: "post",
        url: "https://sandbox.bind.com.ar/v1/login/jwt",
        data: {
          username: "acano@accionpoint.com",
          password: "P23QfRy6xvu4R4s",
        },
      });

      let token = login.data.token;
      return token;
    } catch (err) {
      console.log(err);
    }
  }

  async cvuAlias(token: string, cliente: string) {
    try {
      let cvu = await axios({
        method: "post",
        url:
          "https://sandbox.bind.com.ar/v1/banks/322/accounts/21-1-99999-4-6/owner/wallet/cvu",
        data: {
          client_id: cliente,
          cuit: 27351916473,
          name: "Nombre del Cliente",
          currency: "ARS",
        },
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      let result = cvu.data;
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new loginBindService();
