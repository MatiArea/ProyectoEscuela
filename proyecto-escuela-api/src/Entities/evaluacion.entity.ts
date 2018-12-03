import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
import {Profesor, Alumno} from './persona.entity';
import {NotificacionBoletin} from './notificacion.entity';
import {ConceptoDetalle, Cuota} from './facturacion.entity';

@Entity() export class Anio {
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  numero : number;

  @OneToMany(type => Materia, materia => materia.anio, {
    cascade:true
  })
  materias:Materia[];

  @OneToMany(type => Division, division => division.anio, {
    cascade:true
  })
  divisiones:Division[];
  
}

@Entity() export class Division {
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  nombre : string;
  
  @Column()
  totalAlumnos : number;

  @OneToMany(type => Horario, horario => horario.division, {
    cascade:true
  })
  horarios:Horario[];

  @OneToMany(type => Matricula, matricula => matricula.division, {
    cascade:true
  })
  matriculas:Matricula[];

  @ManyToOne(type => Anio, anio => anio.divisiones)
  anio:Anio;

  @OneToMany(type => Evaluacion, evaluacion => evaluacion.division, {
    cascade:true
  })
  evaluaciones:Evaluacion[];
}

@Entity() export class Materia {
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  departamento : string;

  @Column()
  orientacion : string;

  @Column()
  nombre : string;

  @OneToMany(type => NotaBoletin, notaBoletin => notaBoletin.materia, {
    cascade:true
  })
  notas:NotaBoletin[];

  @OneToMany(type => Horario, horario => horario.materia, {
    cascade:true
  })
  horarios:Horario[];

  @ManyToOne(type => Anio, anio => anio.materias)
  anio:Anio;

  @OneToMany(type => Evaluacion, evaluacion => evaluacion.materia, {
    cascade:true
  })
  evaluaciones:Evaluacion[];
}

@Entity() export class Evaluacion {
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

    @ManyToOne(type=> Profesor, profesor => profesor.evaluaciones)
    profesor:Profesor;

    @ManyToOne(type => Division, division => division.evaluaciones)
    division:Division;

    @ManyToOne(type => Materia, materia => materia.evaluaciones)
    materia:Materia;

    @OneToMany(type => EvaluAlumno, evaluAlumno => evaluAlumno.evaluacion, {
      cascade:true
    })
    notas:EvaluAlumno[];
  }

  
  @Entity() export class Matricula {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('year')
    anioLectivo : string;

    @Column()
    codigo : number;
    
    @Column('date')
    fechaInscripcion : string;

    @ManyToOne(type => Division, division => division.matriculas)
    division:Division;
    
    @ManyToOne(type => Alumno, alumno => alumno.matriculas)
    alumno:Alumno;

    @OneToMany(type => EvaluAlumno, evaluAlumno => evaluAlumno.matricula, {
      cascade:true
    })
    notas:EvaluAlumno[];

    @OneToOne(type => Anio)
    @JoinColumn()
    anio:Anio;

    @OneToMany(type => ConceptoDetalle, conceptoDetalle => conceptoDetalle.matricula, {
      cascade:true
    })
    conceptos:ConceptoDetalle[];

    @OneToMany(type => Cuota, cuota => cuota.matricula, {
      cascade:true
    })
    cuotas:Cuota[];
    
  }


  @Entity() export class EvaluAlumno {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('float')
    nota : number;

    @ManyToOne(type => Matricula, matricula => matricula.notas)
    matricula:Matricula;

    @ManyToOne(type => Evaluacion, evaluacion => evaluacion.notas)
    evaluacion:Evaluacion;
    
  }


  @Entity() export class Boletin {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('year')
    anioLectivo : string;

    @Column()
    codigo : number;

    @OneToOne(type => Matricula)
    alumno:Matricula;

    @OneToMany(type => NotaBoletin, notaBoletin => notaBoletin.boletin, {
      cascade:true
    })
    notas:NotaBoletin[];    
  }

  @Entity() export class NotaBoletin {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('float')
    nota : number;

    @Column('float')
    numeroTrimestre : number;

    @Column()
    tipo:string;

    @ManyToOne(type => Boletin, boletin => boletin.notas)
    boletin:Boletin;

    @ManyToOne(type => Materia, materia => materia.notas)
    materia:Materia;
    
  }


  /*@Entity() export class TipoNota {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    nombre : string;
    
  }*/

  @Entity() export class DiaSemana {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    nombre : string;
    
  }
  
  @Entity() export class Horario {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    anioLectivo:number;

    @Column('time')
    horario: string;

    @OneToOne(type => DiaSemana)
    @JoinColumn()
    dia:DiaSemana;

    @ManyToOne(type=> Profesor, profesor => profesor.horarios)
    profesor:Profesor;
    
    @ManyToOne(type => Materia, materia => materia.horarios)
    materia:Materia;

    @ManyToOne(type => Division, division => division.horarios)
    division:Division;
    
  }

  
 /* @Entity() export class Asistencia{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    fecha : Date;

    @Column()
    tipo : string;
  }

  @Entity() export class TipoAsistencia{
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    tipo : string;
  }*/
  