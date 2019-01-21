import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Alumno } from './alumno.entity';

@Entity() export class Responsable{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;
  
    @Column()
    apellido: string;
  
    @Column()
    dni: number;
  
    @ManyToOne(type => Alumno, alumno => alumno.responsables)
    aCargo: Alumno;
}