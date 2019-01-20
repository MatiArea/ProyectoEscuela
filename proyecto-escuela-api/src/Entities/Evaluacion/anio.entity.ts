import { Materia } from './materia.entity';
import { Division } from './division.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity() export class Anio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @OneToMany(type => Materia, materia => materia.anio, {
    cascade: true,
  })
  materias: Materia[];

  @OneToMany(type => Division, division => division.anio, {
    cascade: true,
  })
  divisiones: Division[];
}