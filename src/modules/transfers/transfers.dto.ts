namespace TransfersModel {
    export interface createCvuTransfer {
        cvu: string,
        importe: number
    }

    export interface createAliasTransfer {
        alias: string,
        importe: number
    }

    export interface saveTransfer {
        origen: string,
        destino: string,
        importe: number,
        moneda: string
    }
}