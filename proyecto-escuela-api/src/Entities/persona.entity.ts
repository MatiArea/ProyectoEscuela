import { AvisoDestinatario } from './notificacion.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne} from 'typeorm';
import {Domicilio} from './domicilio.entity';
import {Horario, Evaluacion, Matricula} from './evaluacion.entity';
import {NotificacionUsuario} from './notificacion.entity';
import {Factura, Arancel} from './facturacion.entity';

@Entity() export class Cuenta {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    user : string;
    
    @Column()
    pass : string;

    @Column()
    roll:string;

    @OneToMany(type => AvisoDestinatario, avisoDestinatario => avisoDestinatario.destinatario, {
      cascade:true
    })
    avisosDestinatarios:AvisoDestinatario[];

    @OneToMany(type => NotificacionUsuario, notificacionUsuario => notificacionUsuario.cuenta, {
      cascade:true
    })
    notificacionUsuario:NotificacionUsuario[];

  }


  @Entity() export class Familiar {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    parentezco : string;
    
    @Column()
    nombre : string;

    @Column()
    apellido : string;

    @Column()
    email : string;
    
    @Column()
    edad : number;

    @Column()
    dni : number;

    @OneToOne(type=>Domicilio)
    @JoinColumn()
    domicilio:Domicilio;

    @OneToOne(type=>Cuenta)
    @JoinColumn()
    cuenta:Cuenta;

    @OneToMany(type => Alumno, alumno => alumno.familiar, {
      cascade:true
    })
    alumnos:Alumno[];

    @OneToMany(type => Factura, factura => factura.responsableFinanciero, {
      cascade:true
    })
    facturas:Factura[];

    @OneToMany(type => Arancel, arancel => arancel.responsableFinanciero, {
      cascade:true
    })
    aranceles:Factura[];
        
  }


  @Entity() export class Profesor {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    antiguedad : number;

    @Column()
    legajo : number;

    @Column()
    titulo : string;
    
    @Column()
    nombre : string;

    @Column()
    apellido : string;

    @Column()
    edad : number;

    @Column()
    dni : number;

    @Column()
    email : string;

    @OneToOne(type=>Domicilio)
    @JoinColumn()
    domicilio:Domicilio;

    @OneToOne(type=>Cuenta)
    @JoinColumn()
    cuenta:Cuenta;

    @OneToMany(type=>Horario, horario => horario.profesor, {
      cascade:true
    })
    horarios:Horario[];

    @OneToMany(type=>Evaluacion, evaluacion => evaluacion.profesor, {
      cascade:true
    })
    evaluaciones:Evaluacion[];

  }



  @Entity() export class Administrativo {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    antiguedad : number;

    @Column()
    cargo : string;

    @Column()
    nombre : string;

    @Column()
    apellido : string;

    @Column()
    edad : number;

    @Column()
    dni : number;

    @Column()
    email : string;

    @OneToOne(type=>Domicilio)
    @JoinColumn()
    domicilio:Domicilio;

    @OneToOne(type=>Cuenta)
    @JoinColumn()
    cuenta:Cuenta;
  }

  @Entity() export class Alumno {
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column('date')
    fechaNacimiento : string;

    @Column()
    dni : number;

    @Column()
    legajo : number;

    @Column()
    nombre : string;

    @Column()
    apellido : string;

    @Column()
    edad : number;

    @Column()
    email : string;

    @OneToOne(type=>Domicilio)
    @JoinColumn()
    domicilio:Domicilio;

    @OneToOne(type=>Cuenta)
    @JoinColumn()
    cuenta:Cuenta;

    @OneToMany(type => Responsable, responsable => responsable.aCargo, {
      cascade:true
    })
    responsables:Responsable[];

    @OneToMany(type => Matricula, matricula => matricula.alumno, {
      cascade:true
    })
    matriculas:Matricula[];

    @ManyToOne(type => Familiar, familiar => familiar.alumnos)
    familiar:Familiar;

}

@Entity() export class Responsable{
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  nombre : string;

  @Column()
  apellido: String;

  @Column()
  dni : number;

  @ManyToOne(type => Alumno, alumno => alumno.responsables)
  aCargo:Alumno;
}