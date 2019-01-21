import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Arancel } from './arancel.entity';
import { Concepto } from './concepto.entity';


@Entity() export class ArancelDetalle {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column('float')
    subtotal: number;

    @Column()
    cantidad: number;

    @ManyToOne(type => Arancel, arancel => arancel.detalles)
    arancel:Arancel;

    @ManyToOne(type => Concepto, concepto => concepto.detallesArancel)
    concepto:Concepto;


  }