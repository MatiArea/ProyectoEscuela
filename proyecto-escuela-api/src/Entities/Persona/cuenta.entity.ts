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
}