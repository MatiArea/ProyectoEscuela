import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Cuenta } from "../Persona/cuenta.entity";
import { AvisoDestinatario } from "./avisoDestinatario.entity";

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
