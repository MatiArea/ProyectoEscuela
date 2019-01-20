import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { TipoNotificacion } from "./tipoNotificacion.entity";
import {NotificacionUsuario} from "./notificacionUsuario.entity";
import { Cuenta } from "../Persona/cuenta.entity";

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