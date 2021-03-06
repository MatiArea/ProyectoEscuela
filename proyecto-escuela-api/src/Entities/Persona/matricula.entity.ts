import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import {Division} from "../Evaluacion/division.entity";
import {EvaluAlumno} from "../Evaluacion/evaluAlumno.entity";
import {Anio} from "../Evaluacion/anio.entity";
import { Alumno } from './alumno.entity';
import { ConceptoDetalle } from '../Facturacion/conceptoDetalle.entity';
import { Cuota } from '../Facturacion/cuota.entity';

@Entity() export class Matricula {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('year')
    anioLectivo: string;

    @Column()
    codigo: number;
    
    @Column('date')
    fechaInscripcion: string;

    @ManyToOne(type => Division, division => division.matriculas)
    division: Division;
    
    @ManyToOne(type => Alumno, alumno => alumno.matriculas)
    alumno: Alumno;

    @OneToMany(type => EvaluAlumno, evaluAlumno => evaluAlumno.matricula, {
      cascade: true,
    })
    notas: EvaluAlumno[];

    @OneToMany(type => ConceptoDetalle, conceptoDetalle => conceptoDetalle.matricula, {
      cascade: true,
    })
    conceptos: ConceptoDetalle[];

    @OneToMany(type => Cuota, cuota => cuota.matricula, {
      cascade: true,
    })
    cuotas: Cuota[];

  }