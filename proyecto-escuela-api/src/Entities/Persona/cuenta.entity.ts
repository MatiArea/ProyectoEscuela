import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { AvisoDestinatario } from '../Notificacion/avisoDestinatario.entity';
import { NotificacionUsuario } from '../Notificacion/notificacionUsuario.entity';

@Entity() export class Cuenta {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    user: string;
    
    @Column()
    pass: string;

    @Column()
    roll: string;

    @OneToMany(type => AvisoDestinatario, avisoDestinatario => avisoDestinatario.destinatario, {
      cascade: true,
    })
    avisosDestinatarios: AvisoDestinatario[];

    @OneToMany(type => NotificacionUsuario, notificacionUsuario => notificacionUsuario.cuenta, {
      cascade: true,
    })
    notificacionUsuario: NotificacionUsuario[];

  }