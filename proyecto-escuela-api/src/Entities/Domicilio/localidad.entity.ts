import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Domicilio } from './domicilio.entity';
import { Provincia } from './provincia.entity';

@Entity() export class Localidad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
    
    @Column()
    cp: number;
    
    @OneToMany(type => Domicilio, domicilio => domicilio.localidad, {
    cascade: true,
    })
    domicilios: Domicilio[];
    
    @ManyToOne(type => Provincia, provincia => provincia.localidades)
    provincia: Provincia;
  }