import { Alumno } from './../Entities/Persona/alumno.entity';
import { Matricula } from './../Entities/Persona/matricula.entity';
import { EvaluAlumno } from './../Entities/Evaluacion/evaluAlumno.entity';
import { Materia } from './../Entities/Evaluacion/materia.entity';
import { Division } from './../Entities/Evaluacion/division.entity';
import { Anio } from './../Entities/Evaluacion/anio.entity';
import { Profesor } from './../Entities/Persona/profesor.entity';
import { Evaluacion } from './../Entities/Evaluacion/evaluacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getRepository, getManager, Repository} from 'typeorm';
import { Injectable } from '@nestjs/common';


@Injectable()
export class EvaluacionService {
    constructor(@InjectRepository(Evaluacion) private evaluacionRepository:Repository<Evaluacion>, 
                @InjectRepository(Division) private divisionRepository:Repository<Division>, 
                @InjectRepository(Anio) private anioRepository:Repository<Anio>, 
                @InjectRepository(Profesor) private profesorRepository:Repository<Profesor>, 
                @InjectRepository(Materia) private materiaRepository:Repository<Materia>, 
                @InjectRepository(Matricula) private matriculaRepository:Repository<Matricula>, 
                @InjectRepository(Alumno) private alumnoRepository:Repository<Alumno>){}

    async getEvaluacionesSinCargar(params){
     const profesor : Profesor = await this.profesorRepository.createQueryBuilder("profesor").select("profesor")
                                            .where("profesor.legajo = :p", {p:params.legajo}).getOne();
     const anio : Anio = await this.anioRepository.createQueryBuilder("anio").select("anio").where("anio.numero = :p", {p:params.anio}).getOne();
     const division : Division = await this.divisionRepository.createQueryBuilder("division").select("division").innerJoinAndSelect("division.anio", "anio")
                                           .where("division.nombre = :p", {p:params.division}).andWhere("division.anio = :a", {a:anio.id}).getOne();                                    
    const materia : Materia = await this.materiaRepository.createQueryBuilder("materia").select("materia").where("materia.nombre = :p", {p:params.materia}).andWhere("materia.anio = :mate", {mate:anio.id}).getOne();
    

    const evaluaciones = await getConnection().createQueryBuilder(Evaluacion, "evaluacion").select("evaluacion.fecha")
                         .addSelect("evaluacion.titulo").addSelect("evaluacion.folio").addSelect("evaluacion.temas")
                         .where("evaluacion.profesor = :profe", {profe:profesor.id}).andWhere("evaluacion.division = :div", {div:division.id})
                         .andWhere("evaluacion.materia = :mate", {mate:materia.id}).andWhere("evaluacion.cargada = :carga", {carga:false}).getMany();
    return evaluaciones;
    }

    updateEvaluacion(param){
        getConnection().createQueryBuilder(Evaluacion, "evaluacion").update(Evaluacion).set({cargada:true}).where("evaluacion.folio = :p", {p:param}).execute();
    }

    async createEvaluAlumnos(params){
        const evaluacioN : Evaluacion = await this.evaluacionRepository.createQueryBuilder("evaluacion").select("evaluacion")
                                        .where("evaluacion.folio = :p", {p:params.folioEvaluacion}).getOne();
        
        for(let indice = 0; indice<=params.notas.length; indice++ ){
           const alumno = await this.matriculaRepository.createQueryBuilder("matricula").select("matricula")
                       .where("matricula.codigo = :p", {p:params.notas[indice].codigoMatricula}).getOne();
            await getConnection().createQueryBuilder(EvaluAlumno, "notas").insert().into(EvaluAlumno)
                  .values([{nota:params.notas[indice].nota, matricula:alumno, evaluacion:evaluacioN }]).execute();
        }
    }

    async getEvaluacionesTodas(param){
        const profesor : Profesor = await this.profesorRepository.createQueryBuilder("profesor").select("profesor")
                                      .where("profesor.legajo = :p", {p:param}).getOne();
        const evaluaciones = getConnection().createQueryBuilder(Evaluacion, "evaluacion").select("evaluacion.fecha").addSelect("evaluacion.folio")
                             .addSelect("evaluacion.titulo").addSelect("evaluacion.temas").addSelect("division.nombre").addSelect("anio.numero")
                             .addSelect("materia.nombre").innerJoin("evaluacion.materia", "materia").innerJoin("evaluacion.division", "division")
                             .innerJoin("division.anio", "anio").where("evaluacion.profesor = :p", {p:profesor.id}).getMany();
        return evaluaciones;
    }


    async getEvaluacionesCargadas(params){

        const profesor : Profesor = await this.profesorRepository.createQueryBuilder("profesor").select("profesor")
                                   .where("profesor.legajo = :p", {p:params.legajo}).getOne();
        const anio : Anio = await this.anioRepository.createQueryBuilder("anio").select("anio").where("anio.numero = :p", {p:params.anio}).getOne();
        const division : Division = await this.divisionRepository.createQueryBuilder("division").select("division")
                                   .where("division.anio = :a", {a:anio.id}).andWhere("division.nombre = :d", {d:params.division}).getOne();  
        
                            
        const materia : Materia = await this.materiaRepository.createQueryBuilder("materia").select("materia").where("materia.nombre = :n", {n:params.materia})
                                   .andWhere("materia.anio = :a", {a:anio.id}).getOne();        
        const evaluaciones = getConnection().createQueryBuilder(Evaluacion, "evaluacion").select("evaluacion.fecha")
                             .addSelect("evaluacion.titulo").addSelect("evaluacion.folio").addSelect("evaluacion.temas")
                             .where("evaluacion.profesor = :p", {p:profesor.id}).andWhere("evaluacion.division = :d", {d:division.id})
                             .andWhere("evaluacion.materia = :m", {m:materia.id}).andWhere("evaluacion.cargada = :c", {c:1}).getMany();
         return evaluaciones;
    }  

    async getFolio(){
        const max = await getConnection().createQueryBuilder(Evaluacion, "evaluacion").select("MAX(evaluacion.id)", "maximo").getRawOne();
        if(max.maximo == null){
            return 19071997
        } else {
            const evaluacion : Evaluacion = await this.evaluacionRepository.createQueryBuilder("evaluacion").select("evaluacion").where("evaluacion.id = :p", {p:max.maximo}).getOne();
            const folio = evaluacion.folio+1;
            return folio;
        }
    }

    async createEvaluacion(params){
        const profesor : Profesor = await this.profesorRepository.createQueryBuilder("profesor").select("profesor")
                                   .where("profesor.legajo = :p", {p:params.legajoProfesor}).getOne();
        const anio : Anio = await this.anioRepository.createQueryBuilder("anio").select("anio").where("anio.numero = :p", {p:params.anio}).getOne();
        const division : Division = await this.divisionRepository.createQueryBuilder("division").select("division")
                                   .where("division.nombre = :d", {d:params.division}).andWhere("division.anio = :a", {a:anio.id}).getOne();
        const materia : Materia = await this.materiaRepository.createQueryBuilder("materia").select("materia").where("materia.nombre = :m", {m:params.materia})
                                   .andWhere("materia.anio = :a", {a:anio.id}).getOne();

        getConnection().createQueryBuilder(Evaluacion, "evaluacion").insert().into(Evaluacion)
        .values([{fecha:params.fecha, folio:params.folio, temas:params.temas, titulo:params.titulo, cargada:false, profesor:profesor, division:division, materia:materia}]).execute();
    }

    async getEvaluacionCompleta(param){
        const evaluacion : Evaluacion = await this.evaluacionRepository.createQueryBuilder("evaluacion").select("evaluacion").where("evaluacion.folio = :p", {p:param}).getOne();
        const eva = getConnection().createQueryBuilder(Evaluacion, "evaluacion").select("evaluacion.fecha").addSelect("evaluacion.titulo").addSelect("evaluacion.temas").addSelect("evaluacion.folio")
                    .addSelect("profesor.nombre").addSelect("profesor.apellido").addSelect("division.nombre").addSelect("anio.numero").addSelect("materia.nombre").addSelect("notas.nota")
                    .addSelect("matricula.codigo").addSelect("alumno.legajo").addSelect("alumno.nombre").addSelect("alumno.apellido")
                    .innerJoin("evaluacion.profesor", "profesor").innerJoin("evaluacion.division", "division").innerJoin("division.anio", "anio").innerJoin("evaluacion.materia", "materia")
                    .innerJoin("evaluacion.notas", "notas").innerJoin("notas.matricula", "matricula").innerJoin("matricula.alumno", "alumno").where("evaluacion.folio = :p", {p:param}).getOne();
         return eva;
    }

    async getEvaluacionesAlumnoTodas(params){
        const alumno : Alumno = await this.alumnoRepository.createQueryBuilder("alumno").select("alumno").where("alumno.legajo = :p", {p:params.legajo}).getOne();
        const matricula : Matricula = await this.matriculaRepository.createQueryBuilder("matricula").select("matricula")
<<<<<<< HEAD
                          .innerJoinAndSelect("matricula.division", "division").innerJoinAndSelect("division.anio", "anio")
                          .where("matricula.alumno = :p", {p:alumno.id}).getOne();  
        const materia : Materia = await this.materiaRepository.createQueryBuilder("materia").select("materia")
                        .where("materia.nombre = :m", {m:params.materia})
                        .andWhere("materia.anio = :a", {a:matricula.division.anio.id}).getOne();                      
        
=======
                          .innerJoinAndSelect("matricula.division","division").innerJoinAndSelect("division.anio","anio")
                          .where("matricula.alumno = :p", {p:alumno.id}).getOne();      
        const materia : Materia = await this.materiaRepository.createQueryBuilder("materia").select("materia")
                            .where("materia.nombre = :m",{m:params.materia})
                            .andWhere("materia.anio = :a", ({a:matricula.division.anio.id})).getOne();
>>>>>>> c828a43ba081c5f9d3c9489d2285455a1fb80cea
        const evaluaciones = await getConnection().createQueryBuilder(EvaluAlumno, "nota").select("nota.nota").addSelect("evaluacion.fecha").addSelect("evaluacion.folio")
                             .addSelect("evaluacion.temas").addSelect("evaluacion.titulo").addSelect("materia.nombre").innerJoin("nota.evaluacion", "evaluacion").innerJoin("evaluacion.materia", "materia").innerJoin("nota.matricula", "matricula")
                             .where("materia.id = :m", {m:materia.id}).andWhere("matricula.id = :p", {p:matricula.id}).getMany();  
        return evaluaciones;                             
    }
    
}







