import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() export class evaluacion {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column('date')
    fecha: string;
    
    @Column()
    folio : number;

    @Column('text')
    temas : string;

    @Column()
    titulo : string;

  }

  @Entity() export class materia {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    departamento : string;

    @Column()
    orientacion : string;

    @Column()
    nombre : string;

  }

  @Entity() export class division {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    nombre : string;
    
    @Column()
    totalalumnos : number;
  }

  @Entity() export class anio {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    numero : number;
    
  }


  @Entity() export class evaluAlumno {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('float')
    nota : number;
    
  }

  @Entity() export class notaBoletin {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('float')
    nota : number;

    @Column('float')
    numeroTrimestre : number;
    
  }

  @Entity() export class tipoNota {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    nombre : string;
    
  }

  @Entity() export class matricula {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('year')
    anioElectivo : string;

    @Column()
    codigo : number;
    
    @Column('date')
    fechaInscripcion : string;
    
  }

  @Entity() export class boletin {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('year')
    anioElectivo : string;

    @Column()
    codigo : number;
    
  }

  @Entity() export class horario {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('time')
    anioElectivo : string;
    
  }

  @Entity() export class diaSemana {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    nombre : string;
    
  }
  
  @Entity() export class asistencia{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    fecha : Date;

    @Column()
    tipo : string;
  }

  @Entity() export class tipoAsistencia{
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    tipo : string;
  }
  