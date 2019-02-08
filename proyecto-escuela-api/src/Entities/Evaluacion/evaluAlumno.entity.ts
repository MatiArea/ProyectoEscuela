import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {Matricula} from "../Persona/matricula.entity";
import {Evaluacion} from "./evaluacion.entity"

@Entity() export class EvaluAlumno {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('float')
    nota: number;

    @ManyToOne(type => Matricula, matricula => matricula.notas)
    matricula: Matricula;

    @ManyToOne(type => Evaluacion, evaluacion => evaluacion.notas)
    evaluacion: Evaluacion;
    
  }