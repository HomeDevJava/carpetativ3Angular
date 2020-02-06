import { Cedi } from '../cedis/cedi';
import { Puesto } from '../puestos/puesto';
export class Empleado {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    cedi: Cedi;
    puesto: Puesto;
}
