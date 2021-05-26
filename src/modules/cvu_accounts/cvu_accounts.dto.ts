namespace cvuAccountsModel {
  export interface createUserCvu {
    userId: string;
    email: string;
  }
  export interface addCvu {
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
    profilePic: string;
    amigos: any;
  }

  export interface createCvu {
    cvu: string;
    alias: string;
    saldo: number;
  }

  export interface addFriend {
    idAmigo: string;
    apodo: string;
  }

  export interface deleteCvuAccount {
    userId: string;
  }

  export interface createFundCvu {
    cvu: string;
    importe: number;
  }
}
