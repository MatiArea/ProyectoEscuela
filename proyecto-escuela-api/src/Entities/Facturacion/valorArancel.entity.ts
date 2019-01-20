import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { Anio } from '../Evaluacion/anio.entity';

@Entity() export class ValorArancel {
    @PrimaryGeneratedColumn()
    id : number;

    @OneToOne(type => Anio)
    @JoinColumn()
    anio:Anio;
  
  }
