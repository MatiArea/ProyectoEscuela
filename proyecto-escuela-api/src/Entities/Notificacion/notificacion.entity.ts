import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
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

    @OneToOne(type => Cuenta)
    @JoinColumn()
    autor:Cuenta;

}