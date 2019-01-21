import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import {Division} from "./division.entity";
import {Materia} from "./materia.entity";
import {DiaSemana} from "./diaSemana.entity";
import { Profesor } from "../Persona/profesor.entity";

@Entity() export class Horario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    anioLectivo: number;

    @Column('time')
    horario: string;

    @OneToOne(type => DiaSemana)
    @JoinColumn()
    dia: DiaSemana;

    @ManyToOne(type => Profesor, profesor => profesor.horarios)
    profesor: Profesor;
    
    @ManyToOne(type => Materia, materia => materia.horarios)
    materia: Materia;

    @ManyToOne(type => Division, division => division.horarios)
    division: Division;
  }