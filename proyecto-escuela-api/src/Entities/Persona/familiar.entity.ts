import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne} from 'typeorm';
import { Domicilio } from '../Domicilio/domicilio.entity';
import { Cuenta } from './cuenta.entity';
import { Alumno } from './alumno.entity';
import { Factura } from '../Facturacion/factura.entity';
import { Arancel } from '../Facturacion/arancel.entity';

@Entity() export class Familiar {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    parentezco: string;
    
    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    email: string;
    
    @Column()
    edad: number;

    @Column()
    dni: number;

    @OneToOne(type => Domicilio)
    @JoinColumn()
    domicilio: Domicilio;

    @OneToOne(type => Cuenta)
    @JoinColumn()
    cuenta: Cuenta;

    @OneToMany(type => Alumno, alumno => alumno.familiar, {
      cascade: true,
    })
    alumnos: Alumno[];

    @OneToMany(type => Factura, factura => factura.responsableFinanciero, {
      cascade: true,
    })
    facturas: Factura[];

    @OneToMany(type => Arancel, arancel => arancel.responsableFinanciero, {
      cascade: true,
    })
    aranceles: Factura[];
        
  }