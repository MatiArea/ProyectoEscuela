import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Notificacion } from "./notificacion.entity";
import { Evaluacion } from "../Evaluacion/evaluacion.entity";

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