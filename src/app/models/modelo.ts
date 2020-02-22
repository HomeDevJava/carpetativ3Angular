import { Marca } from './marca';
import { Device } from './device';
export class Modelo {
    id: number;
    nombre: string;
    marca: Marca;
    device: Device;
}
