import { Pipe, PipeTransform } from '@angular/core';
import { ItemMovactivo } from 'src/app/models/item-movactivo';


@Pipe( {
    name: 'array'
} )
export class ArrayPipe implements PipeTransform {
    transform( items: Array<ItemMovactivo> ): any {
        const arr = [];
        items.map( val => arr.push( val.equipo.serie ) );
        return arr;
    }

}
