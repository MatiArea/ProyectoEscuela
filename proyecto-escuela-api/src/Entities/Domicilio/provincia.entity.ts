import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Localidad } from './localidad.entity';
import { Pais } from './pais.entity';

@Entity() export class Provincia {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;

    @OneToMany(type => Localidad, localidad => localidad.provincia, {
      cascade: true,
    })
    localidades: Localidad[];

    @ManyToOne(type => Pais, pais => pais.provincias)
    pais: Pais;
  }