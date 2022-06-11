import { Platos } from "./platos";

export interface Ticket {
    codCom:string;
    restaurante:string;
    idRes:string;
    tipo:string;
    fecha:string;
    platos:Platos[];
    preciofinal:string;
}
