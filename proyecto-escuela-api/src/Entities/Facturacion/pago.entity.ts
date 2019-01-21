import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn} from 'typeorm';
import { TipoPago } from './tipoPago.entity';
import { Arancel } from './arancel.entity';

@Entity() export class Pago {
  @PrimaryGeneratedColumn()
  id : number;

  @Column('date')
  fecha: string;

  @Column()
  monto: number;

  @OneToOne(type => TipoPago)
  @JoinColumn()
  tipo:TipoPago;

  @OneToMany(type => Arancel, arancel => arancel.pago, {
    cascade:true
  })
  aranceles:Arancel[];

}