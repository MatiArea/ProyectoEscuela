import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import {Horario} from './horario.entity';
import {Matricula} from '../Persona/matricula.entity';
import {Anio} from './anio.entity';
import {Evaluacion} from './evaluacion.entity';

@Entity() export class Division {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;
    
    @Column()
    totalAlumnos: number;
  
    @OneToMany(type => Horario, horario => horario.division, {
      cascade: true,
    })
    horarios: Horario[];
  
    @OneToMany(type => Matricula, matricula => matricula.division, {
      cascade: true,
    })
    matriculas: Matricula[];
  
    @ManyToOne(type => Anio, anio => anio.divisiones)
    anio: Anio;
  
    @OneToMany(type => Evaluacion, evaluacion => evaluacion.division, {
      cascade: true,
    })
    evaluaciones: Evaluacion[];
  }