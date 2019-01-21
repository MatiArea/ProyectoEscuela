import { Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Aviso } from "./aviso.entity";
import { Cuenta } from "../Persona/cuenta.entity";

@Entity()
export class AvisoDestinatario {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Aviso, aviso => aviso.avisosDestinatarios)
    aviso:Aviso;

    @ManyToOne(type => Cuenta , cuenta => cuenta.avisosDestinatarios)
    destinatario:Cuenta;


}
