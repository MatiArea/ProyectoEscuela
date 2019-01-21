import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Concepto } from './concepto.entity';
import { Factura } from './factura.entity';

@Entity() export class FacturaDetalle {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    cantidad: number;
    
    @Column('float')
    subTotal : number;

    @ManyToOne(type => Concepto, concepto => concepto.detallesFactura)
    concepto:Concepto;

    @ManyToOne(type => Factura, factura => factura.detalles)
    factura:Factura;

  }