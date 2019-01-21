import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import { Familiar } from '../Persona/familiar.entity';
import { Arancel } from './arancel.entity';
import { FacturaDetalle } from './facturaDetalle.entity';

@Entity() export class Factura {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    numero: number;
    
    @Column('float')
    total : number;

    @ManyToOne(type => Familiar, familiar => familiar.facturas)
    responsableFinanciero:Familiar;

    @OneToMany(type => FacturaDetalle, facturaDetalle => facturaDetalle.factura, {
      cascade:true
    })
    detalles:FacturaDetalle[];

    @OneToOne(type => Arancel)
    @JoinColumn()
    arancel:Arancel;

  }