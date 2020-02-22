import { Status } from './status';
import { Cedi } from '../models/cedi';
import { Empleado } from '../models/empleado';
import { Itemreparacion } from './itemreparacion';
export class Reparacion {
    id: number;
    fectramite: string;
    status: Status;
    cedi: Cedi;
    empleado: Empleado;
    items: Itemreparacion[];
    observacion: string;
    guiafedex: string;
}
