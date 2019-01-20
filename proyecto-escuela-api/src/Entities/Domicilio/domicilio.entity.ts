import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Localidad } from './localidad.entity';

@Entity() export class Domicilio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    calle: string;
    
    @Column()
    dpto: string;
    
    @Column()
    numero: number;
    
    @ManyToOne(type => Localidad, localidad => localidad.domicilios)
    localidad: Localidad;
  }