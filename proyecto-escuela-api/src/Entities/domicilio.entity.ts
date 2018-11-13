import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity() export class Pais {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    nombre : string;
  }
  
  @Entity() export class provincia {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    nombre : string;
  }
  
  @Entity() export class localidad {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    nombre : string;
  
    @Column()
    cp : number;
  }
  
  @Entity() export class domincilio {
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    calle : string;
    
    @Column()
    dpto : string;

    @Column()
    numero : number;
  }