namespace ExtractionOrderModel {
  export interface createExtractionOrder {
    pin: string;
    importe: number;
    documento: string;
    referencia: string;
    estado: string;
  }

  export interface getAllOrders {
    desde: string;
    hasta: string,
    documento: string
  }

  export interface cashOut {
    documento: string,
    pin: string
  }
}

