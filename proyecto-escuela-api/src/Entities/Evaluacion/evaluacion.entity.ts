import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import {Division} from './division.entity';
import {Materia} from './materia.entity';
import {EvaluAlumno} from './evaluAlumno.entity';
import { Profesor } from '../Persona/profesor.entity';

@Entity() export class Evaluacion {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('date')
    fecha: string;
    
    @Column()
    folio: number;

    @Column('text')
    temas: string;

    @Column()
    titulo: string;

    @ManyToOne(type => Profesor, profesor => profesor.evaluaciones)
    profesor: Profesor;

    @ManyToOne(type => Division, division => division.evaluaciones)
    division: Division;

    @ManyToOne(type => Materia, materia => materia.evaluaciones)
    materia: Materia;

    @OneToMany(type => EvaluAlumno, evaluAlumno => evaluAlumno.evaluacion, {
      cascade: true,
    })
    notas: EvaluAlumno[];
  }