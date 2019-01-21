import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity() export class TipoPago {
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  nombre: string;

}