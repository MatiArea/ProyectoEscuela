import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Aviso } from "./aviso.entity";
import { Notificacion } from "./notificacion.entity";


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