import { Cedi } from './cedi';
import { Puesto } from './puesto';
export class Empleado {
    id: number;
    numempleado: string;
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    cedi: Cedi;
    puesto: Puesto;
}
