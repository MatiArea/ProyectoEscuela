import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Provincia } from './provincia.entity';

@Entity() export class Pais {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;

    @OneToMany(type => Provincia, provincia => provincia.pais, {
      cascade: true,
    })
    provincias: Provincia[];
  }
