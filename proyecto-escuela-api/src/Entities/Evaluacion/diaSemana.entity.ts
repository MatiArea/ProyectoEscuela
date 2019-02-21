import { Horario } from './horario.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

@Entity() export class DiaSemana {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(type => Horario, horario => horario.dia)
    horarios: Horario[];
  }