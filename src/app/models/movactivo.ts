import { Empleado } from './empleado';
import { Cedi } from './cedi';
import { ItemMovactivo } from './item-movactivo';

export class Movactivo {

    id: number;
    fecha: string;
    origen: Cedi;
    destino: Cedi;
    empleado: Empleado;
    motivo: string;
    caracteristica: string;
    items: ItemMovactivo[];
}
