import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne} from 'typeorm';
import { Domicilio } from '../Domicilio/domicilio.entity';
import { Cuenta } from './cuenta.entity';
import { Responsable } from './responsable.entity';
import { Matricula } from './matricula.entity';
import { Familiar } from './familiar.entity';

@Entity() export class Alumno {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('date')
    fechaNacimiento: string;

    @Column()
    dni: number;

    @Column()
    legajo: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    edad: number;

    @Column()
    email: string;

    @OneToOne(type => Domicilio)
    @JoinColumn()
    domicilio: Domicilio;

    @OneToOne(type => Cuenta)
    @JoinColumn()
    cuenta: Cuenta;

    @OneToMany(type => Responsable, responsable => responsable.aCargo, {
      cascade: true,
    })
    responsables: Responsable[];

    @OneToMany(type => Matricula, matricula => matricula.alumno, {
      cascade: true,
    })
    matriculas: Matricula[];

    @ManyToOne(type => Familiar, familiar => familiar.alumnos)
    familiar: Familiar;

}
