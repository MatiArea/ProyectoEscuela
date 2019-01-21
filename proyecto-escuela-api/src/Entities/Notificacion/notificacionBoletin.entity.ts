import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Boletin } from "../Evaluacion/boletin.entity";
import { Notificacion } from "./notificacion.entity";

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