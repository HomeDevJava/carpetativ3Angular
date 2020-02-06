import { Marca } from '../marcas/marca';
import { Device } from '../devices/device';
export class Modelo {
    id: number;
    nombre: string;
    marca: Marca;
    device: Device;
}
