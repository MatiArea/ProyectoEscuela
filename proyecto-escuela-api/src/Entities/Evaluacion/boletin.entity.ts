import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import {Matricula} from '../Persona/matricula.entity';
import {NotaBoletin} from './notaBoletin.entity';

@Entity() export class Boletin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('year')
    anioLectivo: string;

    @Column()
    codigo: number;

    @OneToOne(type => Matricula)
    @JoinColumn()
    alumno: Matricula;

    @OneToMany(type => NotaBoletin, notaBoletin => notaBoletin.boletin, {
      cascade: true,
    })
    notas: NotaBoletin[];

    @Column()
    trimestre1: boolean;

    @Column()
    trimestre2: boolean;
    
    @Column()
    trimestre3: boolean;
  }