import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Cuota } from './cuota.entity';
import { Concepto } from './concepto.entity';


  @Entity() export class ConceptoCuota {
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(type => Cuota, cuota => cuota.detalles)
    cuota:Cuota;

    @ManyToOne(type => Concepto, concepto => concepto.detallesCuota)
    concepto:Concepto;
  
  }
