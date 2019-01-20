import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import {NotaBoletin} from "./notaBoletin.entity";
import {Horario} from "./horario.entity";
import {Anio} from "./anio.entity";
import {Evaluacion} from "./evaluacion.entity"; 

@Entity() export class Materia {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    departamento: string;
  
    @Column()
    orientacion: string;
  
    @Column()
    nombre: string;
  
    @OneToMany(type => NotaBoletin, notaBoletin => notaBoletin.materia, {
      cascade: true,
    })
    notas: NotaBoletin[];
  
    @OneToMany(type => Horario, horario => horario.materia, {
      cascade: true,
    })
    horarios: Horario[];
  
    @ManyToOne(type => Anio, anio => anio.materias)
    anio: Anio;
  
    @OneToMany(type => Evaluacion, evaluacion => evaluacion.materia, {
      cascade: true,
    })
    evaluaciones: Evaluacion[];
  }