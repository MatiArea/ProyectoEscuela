import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Cuenta } from "../Persona/cuenta.entity";

@Entity() export class Notificacion{
    @PrimaryGeneratedColumn()
    id : number; 

    @Column('')
    titulo: string;

    @Column('text')
    descripcion : string;

    @Column('text')
    cuerpo: string;

    @Column('date')
    fecha : String;

    @Column()
    leida:boolean;

    @Column()
    enviada:boolean;

   @ManyToOne(type => Cuenta, cuenta => cuenta.notificacionesEnviadas)
    autor:Cuenta;

   @ManyToOne(type => Cuenta, cuenta => cuenta.notificacionesRecibidas)
    destinatario:Cuenta;
}