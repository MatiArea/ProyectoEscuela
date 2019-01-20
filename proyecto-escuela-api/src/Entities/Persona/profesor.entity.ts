import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne} from 'typeorm';
import { Domicilio } from '../Domicilio/domicilio.entity';
import { Horario } from '../Evaluacion/horario.entity';
import { Cuenta } from './cuenta.entity';
import { Evaluacion } from '../Evaluacion/evaluacion.entity';

@Entity() export class Profesor {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    antiguedad: number;

    @Column()
    legajo: number;

    @Column()
    titulo: string;
    
    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    edad: number;

    @Column()
    dni: number;

    @Column()
    email: string;

    @OneToOne(type => Domicilio)
    @JoinColumn()
    domicilio: Domicilio;

    @OneToOne(type => Cuenta)
    @JoinColumn()
    cuenta: Cuenta;

    @OneToMany(type => Horario, horario => horario.profesor, {
      cascade: true,
    })
    horarios: Horario[];

    @OneToMany(type => Evaluacion, evaluacion => evaluacion.profesor, {
      cascade: true,
    })
    evaluaciones: Evaluacion[];
}