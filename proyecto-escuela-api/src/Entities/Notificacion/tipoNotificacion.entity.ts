import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class TipoNotificacion {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('')
    nombre : string;
}