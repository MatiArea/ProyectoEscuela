import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import { Matricula } from '../Persona/matricula.entity';
import { Concepto } from './concepto.entity';


@Entity() export class ConceptoDetalle {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column('float')
    porcentajeDescuento: number;

    @ManyToOne(type => Matricula, matricula => matricula.conceptos)
    matricula:Matricula;

    @ManyToOne(type => Concepto, concepto => concepto.detalles)
    concepto:Concepto;

  }