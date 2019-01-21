import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {Materia} from "./materia.entity";
import {Boletin} from "./boletin.entity";

@Entity() export class NotaBoletin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('float')
    nota: number;

    @Column('float')
    numeroTrimestre: number;

    @Column()
    tipo: string;

    @ManyToOne(type => Boletin, boletin => boletin.notas)
    boletin: Boletin;

    @ManyToOne(type => Materia, materia => materia.notas)
    materia: Materia;
    
  }