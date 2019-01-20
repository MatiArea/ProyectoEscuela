import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { ConceptoCuota } from './conceptoCuota.entity';
import { ConceptoDetalle } from './conceptoDetalle.entity';
import { ArancelDetalle } from './arancelDetalle.entity';
import { FacturaDetalle } from './facturaDetalle.entity';

@Entity() export class Concepto {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    codigo: string;
    
    @Column()
    nombre : string;

    @Column('float')
    porcentajeDescuento : number;

    @Column('float')
    precio : number;

    @OneToMany(type => ConceptoCuota, conceptoCuota => conceptoCuota.cuota, {
      cascade:true
    })
    detallesCuota:ConceptoCuota[];

    @OneToMany(type => ConceptoDetalle, conceptoDetalle => conceptoDetalle.concepto, {
      cascade:true
    })
    detalles:ConceptoDetalle[];

    @OneToMany(type => ArancelDetalle, arancelDetalle => arancelDetalle.concepto, {
      cascade:true
    })
    detallesArancel:ArancelDetalle[];

    @OneToMany(type => FacturaDetalle, facturaDetalle => facturaDetalle.concepto, {
      cascade:true
    })
    detallesFactura:FacturaDetalle[];

  }