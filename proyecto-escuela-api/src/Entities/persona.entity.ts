import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity() export class usuario {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    usuario : string;
    
    @Column()
    password : string;
  }


  @Entity() export class familiar {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    parentezco : string;
    
    @Column()
    nombre : string;

    @Column()
    apellido : string;

    @Column()
    email : string;
    
    @Column()
    edad : number;

    @Column()
    dni : number;
        
  }


  @Entity() export class profesor {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    antiguedad : number;

    @Column()
    legajo : number;

    @Column()
    titulo : string;
    
    @Column()
    nombre : string;

    @Column()
    apellido : string;

    @Column()
    edad : number;

    @Column()
    dni : number;

    @Column()
    email : string;

  }



  @Entity() export class administrativo {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    antiguedad : number;

    @Column()
    cargo : string;

    @Column()
    nombre : string;

    @Column()
    apellido : string;

    @Column()
    edad : number;

    @Column()
    dni : number;

    @Column()
    email : string;
  }

  @Entity() export class alumno {
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    fechaNacimiento : number;

    @Column()
    dni : number;

    @Column()
    legajo : number;

    @Column()
    nombre : string;

    @Column()
    apellido : string;

    @Column()
    edad : number;

    @Column()
    email : string;

}

