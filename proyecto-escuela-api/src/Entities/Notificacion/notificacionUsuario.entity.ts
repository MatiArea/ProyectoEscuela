import { Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Notificacion } from "./notificacion.entity";
import { Cuenta } from "../Persona/cuenta.entity";

@Entity()
export class NotificacionUsuario {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Notificacion, notificacion => notificacion.notificacionUsuario)
    notificacion:Notificacion;

    @ManyToOne(type => Cuenta, cuenta => cuenta.notificacionUsuario)
    cuenta:Cuenta;
}