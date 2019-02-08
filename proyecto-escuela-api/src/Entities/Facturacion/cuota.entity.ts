import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import { Matricula } from '../Persona/matricula.entity';
import { EstadoCuota } from './estadoCuota.entity';
import { ConceptoCuota } from './conceptoCuota.entity';

@Entity() export class Cuota {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('date')
    fechaEmision: string;

    @Column()
    monto: number;

    @Column()
    numero: number;

    @ManyToOne(type => Matricula, matricula => matricula.cuotas)
    matricula:Matricula;

    @OneToOne(type => EstadoCuota)
    @JoinColumn()
    estado:EstadoCuota;
    
    @OneToMany(type => ConceptoCuota, conceptoCuota => conceptoCuota.cuota, {
      cascade:true
    })
    detalles:ConceptoCuota[];
  }