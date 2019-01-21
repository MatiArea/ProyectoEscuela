import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity() export class EstadoCuota {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;

  }