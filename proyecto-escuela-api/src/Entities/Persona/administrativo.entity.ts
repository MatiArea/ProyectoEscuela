import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne} from 'typeorm';
import { Domicilio } from '../Domicilio/domicilio.entity';
import { Cuenta } from './cuenta.entity';

@Entity() export class Administrativo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    antiguedad: number;

    @Column()
    cargo: string;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    edad: number;

    @Column()
    dni: number;

    @Column()
    email: string;

    @OneToOne(type => Domicilio)
    @JoinColumn()
    domicilio: Domicilio;

    @OneToOne(type => Cuenta)
    @JoinColumn()
    cuenta: Cuenta;
  }
