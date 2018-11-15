import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import {Cuenta} from './persona.entity';
import {Boletin, Evaluacion} from './evaluacion.entity';
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';
import { join } from 'path';


@Entity()
export class TipoNotificacion {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('')
    nombre : string;
}

@Entity() export class Notificacion{
    @PrimaryGeneratedColumn()
    id : number; 

    @Column('text')
    descripcion : string;

    @Column('date')
    fecha : String;

    @Column()
    leida:boolean;

    @Column()
    enviada:boolean;

    @OneToOne(type => TipoNotificacion)
    @JoinColumn()
    tipo:TipoNotificacion;  

    @OneToMany(type => NotificacionUsuario, notificacionUsuario => notificacionUsuario.notificacion, {
        cascade:true
    })
    notificacionUsuario:NotificacionUsuario[];

    @OneToOne(type => Cuenta)
    @JoinColumn()
    autor:Cuenta;

}

@Entity()
export class NotificacionUsuario {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Notificacion, notificacion => notificacion.notificacionUsuario)
    notificacion:Notificacion;

    @ManyToOne(type => Cuenta, cuenta => cuenta.notificacionUsuario)
    cuenta:Cuenta;
}

@Entity()
export class Aviso{
    @PrimaryGeneratedColumn()
    id : number;

    @Column('')
    titulo : string;

    @Column('text')
    descripcion : string;

    @OneToMany(type => AvisoDestinatario, avisoDestinatario => avisoDestinatario.aviso, {
        cascade:true
    })
    avisosDestinatarios: AvisoDestinatario[];

    @OneToOne(type => Cuenta)
    @JoinColumn()
    autor:Cuenta;

}

@Entity() 
export class NotificacionAviso {
    @PrimaryGeneratedColumn()
    id : number; 

    @OneToOne(type => Aviso)
    @JoinColumn()
    aviso:Aviso;

    @OneToOne(type => Notificacion)
    @JoinColumn()
    notificacion:Notificacion;
}

@Entity()
export class NotificacionEvaluacion {
    @PrimaryGeneratedColumn()
    id : number;

    @OneToOne(type => Notificacion)
    @JoinColumn()
    notificacion:Notificacion;

    @OneToOne(type => Evaluacion)
    @JoinColumn()
    evaluacion:Evaluacion;
}

@Entity() 
export class NotificacionBoletin {
    @PrimaryGeneratedColumn()
    id : number;

    @OneToOne(type => Boletin)
    @JoinColumn()
    boletin:Boletin;

    @OneToOne(type => Notificacion)
    @JoinColumn()
    notificacion:Notificacion;
}


@Entity()
export class AvisoDestinatario {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Aviso, aviso => aviso.avisosDestinatarios)
    aviso:Aviso;

    @ManyToOne(type => Cuenta , cuenta => cuenta.avisosDestinatarios)
    destinatario:Cuenta;


}
