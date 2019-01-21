import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity() export class DiaSemana {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
  }