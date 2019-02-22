import { MailService } from './mail.service';
import { Evaluacion } from './../Entities/Evaluacion/evaluacion.entity';
import { Division } from './../Entities/Evaluacion/division.entity';
import { Anio } from './../Entities/Evaluacion/anio.entity';
import { EvaluAlumno } from './../Entities/Evaluacion/evaluAlumno.entity';
import { Profesor } from './../Entities/Persona/profesor.entity';
import { Administrativo } from './../Entities/Persona/administrativo.entity';
import { Matricula } from './../Entities/Persona/matricula.entity';
import { Notificacion } from './../Entities/Notificacion/notificacion.entity';
import { getConnection, getRepository, getManager, Repository} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alumno } from './../Entities/Persona/alumno.entity';
import { Cuenta } from './../Entities/Persona/cuenta.entity';

@Injectable()
export class NotificacionService {

    constructor(@InjectRepository(Alumno) private alumnoRepository:Repository<Alumno>, 
                @InjectRepository(Cuenta) private cuentaRepository:Repository<Cuenta>,
                @InjectRepository(Notificacion) private notificacionRepository:Repository<Notificacion>,
                @InjectRepository(Matricula) private matriculaRepository:Repository<Matricula>, 
                @InjectRepository(Profesor) private profesorRepository:Repository<Profesor>, 
                @InjectRepository(Administrativo) private adminRepository:Repository<Administrativo>, 
                @InjectRepository(EvaluAlumno) private evaluAlumnoRepository:Repository<EvaluAlumno>, 
                @InjectRepository(Anio) private anioRepository:Repository<Anio>, 
                @InjectRepository(Division) private divisionRepository:Repository<Division>, 
                @InjectRepository(Evaluacion) private evaluacionRepository:Repository<Evaluacion>, 
                private readonly mailService: MailService){}

   async getNotificacionesNoLeidas(legajo){
        const alumno : Alumno = await this.alumnoRepository.createQueryBuilder("alumno").select("alumno").innerJoinAndSelect("alumno.cuenta", "cuenta").where("alumno.legajo = :p", {p:legajo}).getOne();
        const notificaciones = await getConnection().createQueryBuilder(Notificacion, "notificacion").select("notificacion.id").addSelect("notificacion.titulo")
                               .addSelect("notificacion.descripcion").addSelect("notificacion.fecha")
                               .where("notificacion.destinatario = :a", {a:alumno.cuenta.id}).andWhere("notificacion.leida = :f", {f:0})
                               .orderBy("notificacion.fecha", "DESC").getMany();
        return notificaciones;
    }

    async getNotificaciones(legajo){
        const alu : Alumno = await this.alumnoRepository.createQueryBuilder("alumno").select("alumno").innerJoinAndSelect("alumno.cuenta", "cuenta").where("alumno.legajo = :p", {p:legajo}).getOne();
        const notificaciones = await getConnection().createQueryBuilder(Notificacion, "notificacion").select("notificacion.id").addSelect("notificacion.titulo")
                               .addSelect("notificacion.descripcion").addSelect("notificacion.fecha")
                               .where("notificacion.destinatario = :p", {p:alu.cuenta.id}).orderBy("notificacion.fecha", "DESC").getMany();
        return notificaciones;
    }

    async showNotificacion(id){
        const notificacion : Notificacion = await this.notificacionRepository.createQueryBuilder("notificacion").select("notificacion")
                                            .where("notificacion.id = :p", {p:id}).getOne();
        return notificacion;
    }

    async updateNotificacion(id){
        await getConnection().createQueryBuilder(Notificacion, "Notificacion").update(Notificacion).set({leida:true})
        .where("notificacion.id = :p", {p:id}).execute();
        let res = {
            status:200,
            message:'OK'
        }
        return res;
    }

    async createNotificacionAvisoTodos(params){
        var autorCuenta, destinatarioCuenta: Cuenta;

        if(params.rollAutor == "Profesor"){
            const profesor : Profesor = await this.profesorRepository.createQueryBuilder("profesor").select("profesor")
                                        .innerJoinAndSelect("profesor.cuenta", "cuenta").where("profesor.dni = :p", {p:params.dniAutor}).getOne();
            autorCuenta= await this.cuentaRepository.createQueryBuilder("cuenta").select("cuenta").where("cuenta.id = :p", {p:profesor.cuenta.id}).getOne();
        } else {
            const admin : Administrativo = await this.adminRepository.createQueryBuilder("administrativo").select("administrativo")
                                        .innerJoinAndSelect("administrativo.cuenta", "cuenta").where("administrativo.dni = :p", {p:params.dniAutor}).getOne();
            autorCuenta= await this.cuentaRepository.createQueryBuilder("cuenta").select("cuenta").where("cuenta.id = :p", {p:admin.cuenta.id}).getOne();
        }

        const matriculas : Matricula[] = await this.matriculaRepository.createQueryBuilder("matricula").select("matricula")
                                         .innerJoinAndSelect("matricula.alumno", "alumno").innerJoinAndSelect("alumno.cuenta", "cuenta")
                                         .where("matricula.division = :p", {p:params.divisionID}).getMany();

        for(let indice = 0; indice <= matriculas.length; indice++){
            destinatarioCuenta = await this.cuentaRepository.createQueryBuilder("cuenta").select("cuenta")
                                  .where("cuenta.id = :p", {p:matriculas[indice].alumno.cuenta.id}).getOne();
            await getConnection().createQueryBuilder(Notificacion, "notificacion").insert().into(Notificacion)
                                 .values([{titulo:params.titulo, descripcion:params.descripcion, cuerpo:params.cuerpo, fecha:params.fecha, 
                                leida:false, enviada:true, autor: autorCuenta, destinatario:destinatarioCuenta}]).execute();
            this.mailService.enviarCorreoNotificacion(matriculas[indice].alumno.email, params.cuerpo);           
        } 
        var res = {
            status:200,
            message:'OK'
        }
        return res;
        
    }


    async createOneNotificacionAviso(params){
        var autorCuenta, destinatarioCuenta: Cuenta;
        var alu : Alumno;

        if(params.rollAutor == "Profesor"){
            const profesor : Profesor = await this.profesorRepository.createQueryBuilder("profesor").select("profesor")
                                        .innerJoinAndSelect("profesor.cuenta", "cuenta").where("profesor.dni = :p", {p:params.dniAutor}).getOne();
            autorCuenta= await this.cuentaRepository.createQueryBuilder("cuenta").select("cuenta").where("cuenta.id = :p", {p:profesor.cuenta.id}).getOne();
        } else {
            const admin : Administrativo = await this.adminRepository.createQueryBuilder("administrativo").select("administrativo")
                                        .innerJoinAndSelect("administrativo.cuenta", "cuenta").where("administrativo.dni = :p", {p:params.dniAutor}).getOne();
            autorCuenta= await this.cuentaRepository.createQueryBuilder("cuenta").select("cuenta").where("cuenta.id = :p", {p:admin.cuenta.id}).getOne();
        }
        
        for(let indice = 0; indice<=params.legajosDestinatarios.length; indice++){
             alu = await this.alumnoRepository.createQueryBuilder("alumno").select("alumno").innerJoinAndSelect("alumno.cuenta", "cuenta")
                              .where("alumno.legajo = :p", {p:params.legajosDestinatarios[indice]}).getOne();

            destinatarioCuenta = await this.cuentaRepository.createQueryBuilder("cuenta").select("cuenta").where("cuenta.id = :p", {p:alu.cuenta.id}).getOne();

            await getConnection().createQueryBuilder(Notificacion, "notificacion").insert().into(Notificacion)
            .values([{titulo:params.titulo, descripcion:params.descripcion, cuerpo:params.cuerpo, fecha:params.fecha, 
           leida:false, enviada:true, autor: autorCuenta, destinatario:destinatarioCuenta}]).execute();
        }

        var res = {
            status:200,
            message:'OK'
        }
        return res;
    }

    async createNotificacionEvaluacionTodos(params){

        const profesor : Profesor = await this.profesorRepository.createQueryBuilder("profesor").select("profesor")
                                        .innerJoinAndSelect("profesor.cuenta", "cuenta").where("profesor.legajo = :p", {p:params.legajo}).getOne();
        const anio : Anio = await this.anioRepository.createQueryBuilder("anio").select("anio").where("anio.numero = :p", {p:params.anio}).getOne();
        const division : Division = await this.divisionRepository.createQueryBuilder("division").select("division").where("division.nombre = :p", {p:params.division}).andWhere("division.anio = :a", {a:anio.id}).getOne();
        
        const matriculas : Matricula[] = await this.matriculaRepository.createQueryBuilder("matricula").select("matricula")
                                        .innerJoinAndSelect("matricula.alumno", "alumno").innerJoinAndSelect("alumno.cuenta", "cuenta")
                                        .where("matricula.division = :p", {p:division.id}).getMany();
        const evaluacion : Evaluacion = await this.evaluacionRepository.createQueryBuilder("evaluacion").select("evaluacion").innerJoinAndSelect("evaluacion.materia", "materia").where("evaluacion.folio = :f", {f:params.folio}).getOne();
        
        for(let indice = 0; indice <= matriculas.length; indice++){
         const notaEva : EvaluAlumno = await this.evaluAlumnoRepository.createQueryBuilder("evaluAlumno").select("evaluAlumno").where("evaluAlumno.matricula = :p", {p:matriculas[indice].id}).andWhere("evaluAlumno.evaluacion = :n", {n:evaluacion.id}).getOne();  
         const nota = notaEva.nota.toString();
         const notificacion = {
             titulo:'Evaluacion',
             descripcion:'Se han subido las notas de una nueva evaluacion', 
             cuerpo:'TEMAS EVALUACION : '+evaluacion.temas+'. MATERIA: '+evaluacion.materia.nombre+'. NOTA: '+nota
         }
                                                               
        await getConnection().createQueryBuilder(Notificacion, "notificacion").insert().into(Notificacion)
        .values([{titulo:notificacion.titulo, descripcion:notificacion.descripcion, cuerpo:notificacion.cuerpo, fecha:params.fecha, 
                leida:false, enviada:true, autor: profesor.cuenta, destinatario:matriculas[indice].alumno.cuenta}]).execute();
                this.mailService.enviarCorreoNotaSubida(matriculas[indice].alumno.email, evaluacion.titulo, evaluacion.fecha, evaluacion.materia.nombre);
                
         }
         var res = {
            status:200,
            message:'OK'
        }
        return res;
    }

    async createNotificacionBoletinAlumno(params){
        const preceptor : Administrativo = await this.adminRepository.createQueryBuilder("administrativo").select("administrativo")
                                        .innerJoinAndSelect("administrativo.cuenta", "cuenta").where("administrativo.dni = :p", {p:params.dniPreceptor}).getOne();
        const alumno : Alumno = await this.alumnoRepository.createQueryBuilder("alumno").select("alumno").innerJoinAndSelect("alumno.cuenta", "cuenta").where("alumno.legajo = :l", {l:params.legajoAlumno}).getOne();
        const trimestre = params.trimestre.toString();
        const notificacion = {
            titulo:'Boletin',
            descripcion:'Se han actualizado las notas de su Boletin Digital', 
            cuerpo:'Se han subido las notas del '+trimestre+'° trimestre, al boletin Digital del alumno '+alumno.apellido+' '+alumno.nombre+'.' 
        }

        await getConnection().createQueryBuilder(Notificacion, "notificacion").insert().into(Notificacion)
        .values([{titulo:notificacion.titulo, descripcion:notificacion.descripcion, cuerpo:notificacion.cuerpo, fecha:params.fecha, 
                leida:false, enviada:true, autor: preceptor.cuenta, destinatario:alumno.cuenta}]).execute();

                this.mailService.enviarCorreoBoletinSubido(alumno.email, trimestre);

                var res = {
                    status:200,
                    message:'OK'
                }
                return res;
    }



}
