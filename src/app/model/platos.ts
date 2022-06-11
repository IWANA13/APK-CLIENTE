import { Suplementos } from "./suplementos";

export interface Platos {
    platos:string;
    cantidad:string;
    suplementos?:Suplementos[];
    precio:string;
}
