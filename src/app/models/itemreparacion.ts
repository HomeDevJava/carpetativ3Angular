import { Reparacion } from './reparacion';
import { Equipo } from '../models/equipo';
import { Tipoproblema } from './tipoproblema';
export class Itemreparacion {
    id: number;
    reparacion: Reparacion;
    equipo: Equipo;
    tipoproblema: Tipoproblema;
    fecenvio: string;
    fecretorno: string;
    falla: string;
}
