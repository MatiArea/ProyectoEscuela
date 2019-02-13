import { Notificacion } from './../Notificacion/notificacion.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity() export class Cuenta {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    user: string;
    
    @Column()
    pass: string;

    @Column()
    roll: string;

    @OneToMany(type => Notificacion, notificacion => notificacion.autor)
    notificacionesEnviadas: Notificacion[];

    @OneToMany(type => Notificacion, notificacion => notificacion.destinatario)
     notificacionesRecibidas: Notificacion[];
}