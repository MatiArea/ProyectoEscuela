import { Responsable } from './Entities/Persona/responsable.entity';
import { Horario } from './Entities/Evaluacion/horario.entity';
import { Profesor } from './Entities/Persona/profesor.entity';
import { Matricula } from './Entities/Persona/matricula.entity';
import { Alumno } from './Entities/Persona/alumno.entity';
import { Division } from './Entities/Evaluacion/division.entity';
import { Anio } from './Entities/Evaluacion/anio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import {getConnection, getManager, getRepository, Repository} from "typeorm";

@Injectable()
export class AppService { 

constructor(@InjectRepository(Anio) private anioRepository:Repository<Anio>, 
             @InjectRepository(Division) private divisionRepository:Repository<Division>, 
             @InjectRepository(Profesor) private profesorRepository:Repository<Profesor>, 
             @InjectRepository(Alumno) private alumnoRepository:Repository<Alumno>, 
             @InjectRepository(Matricula) private matriculaRepository:Repository<Matricula>){}

  root(): string {
    return 'Bienvenido!!';
  }

  getAnios(){
    const anios = getConnection().createQueryBuilder(Anio, "anio").select("anio").getMany();
    return anios;
  }

  getDivisionByAnio(anio){
   const divisiones = getConnection().createQueryBuilder(Division, "division").select("division.id").addSelect("division.nombre")
                      .where("division.anio = :p", {p:anio}).getMany();
   return divisiones;
  }

  getAlumnosByDivisionID(division){
    const alumnos = getConnection().createQueryBuilder(Matricula, "matricula").select("matricula.codigo").addSelect("alumno.nombre")
                    .addSelect("alumno.apellido").addSelect("alumno.legajo").addSelect("alumno.dni")
                    .innerJoin("matricula.alumno", "alumno").where("matricula.division = :p", {p:division}).getMany();
    return alumnos;                    
  }

  async getAlumnosByAnioAndDivision(params){
    const anio : Anio = await this.anioRepository.createQueryBuilder("anio").select("anio").where("anio.numero = :p", {p:params.anio}).getOne();
    const division : Division = await this.divisionRepository.createQueryBuilder("division").where("division.nombre = :d", {d:params.division})
                                .andWhere("division.anio = :a", {a:anio.id}).getOne();
    const alumnos = getConnection().createQueryBuilder(Matricula, "matricula").select("matricula.codigo").addSelect("alumno.nombre")
                    .addSelect("alumno.apellido").addSelect("alumno.legajo").innerJoin("matricula.alumno", "alumno")
                    .where("matricula.division = :p", {p:division.id}).getMany();
    return alumnos;
  }

  async getMateriasACargo(legajo){
    const profesor : Profesor = await this.profesorRepository.createQueryBuilder("profesor").select("profesor")
                                .where("profesor.legajo = :p", {p:legajo}).getOne();
    const materias = getConnection().createQueryBuilder(Horario, "horario").select("materia.nombre").addSelect("dia.nombre")
                     .addSelect("horario.horario").addSelect("anio.numero").addSelect("division.nombre").innerJoin("horario.materia", "materia")
                     .innerJoin("horario.dia", "dia").innerJoin("horario.division", "division").innerJoin("materia.anio", "anio")
                     .where("horario.profesor = :p", {p:profesor.id}).getMany();
    return materias;
  }

  async getMateriasCursadas(legajo){
       const alumno : Alumno = await this.alumnoRepository.createQueryBuilder("alumno").select("alumno").where("alumno.legajo = :p", {p:legajo}).getOne();
       const matricula : Matricula = await this.matriculaRepository.createQueryBuilder("matricula").select("matricula")
                         .innerJoinAndSelect("matricula.division", "division").where("matricula.alumno = :p", {p:alumno.id}).getOne();
       const horarios = getConnection().createQueryBuilder(Horario, "horario").select("horario.horario").addSelect("dia.nombre").addSelect("materia.nombre")
                         .innerJoin("horario.dia", "dia").innerJoin("horario.materia", "materia").where("horario.division = :p", {p:matricula.division.id}).getMany();
       return horarios; 
      
  }

  async getAniosConDivisiones(){
<<<<<<< HEAD
    const anios : Anio[] = await this.anioRepository.createQueryBuilder("anio").select("anio.numero").addSelect("division.nombre")
                  .innerJoin("anio.divisiones", "division").getMany();
    return anios;
  }



=======
    const anios = getConnection().createQueryBuilder(Anio,"anio").select("anio.numero").select("anio.numero").addSelect("division.nombre")
                        .innerJoin("anio.divisiones","division").getMany();
    return anios;
  }

>>>>>>> c828a43ba081c5f9d3c9489d2285455a1fb80cea
}