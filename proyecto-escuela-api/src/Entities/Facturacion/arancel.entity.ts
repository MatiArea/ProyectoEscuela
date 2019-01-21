import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import { Familiar } from '../Persona/familiar.entity';
import { Pago } from './pago.entity';
import { ArancelDetalle } from './arancelDetalle.entity';



@Entity() export class Arancel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  fechaEmision: string;
  
  @Column('date')
  fechaVencimiento: string;

  @Column('float')
  total: number;

  @ManyToOne(type => Familiar, familiar => familiar.aranceles)
  responsableFinanciero: Familiar;

  @ManyToOne(type => Pago, pago => pago.aranceles)
  pago: Pago;

  @OneToMany(type => ArancelDetalle, arancelDetalle => arancelDetalle.arancel, {
    cascade: true,
  })
  detalles: ArancelDetalle[];    

}