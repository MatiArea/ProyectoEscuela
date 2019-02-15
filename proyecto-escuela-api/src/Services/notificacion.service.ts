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
                @InjectRepository(Administrativo) private adminRepository:Repository<Administrativo>){}

   async getNotificacionesNoLeidas(legajo){
        const alu : Alumno = await this.alumnoRepository.createQueryBuilder("alumno").select("alumno").innerJoinAndSelect("alumno.cuenta", "cuenta").where("alumno.legajo = :p", {p:legajo}).getOne();
        const notificaciones = await getConnection().createQueryBuilder(Notificacion, "notificacion").select("notificacion.id").addSelect("notificacion.titulo")
                               .addSelect("notificacion.descripcion").addSelect("notificacion.fecha")
                               .where("notificacion.destinatario = :p", {p:alu.cuenta.id}).andWhere("notificacion.leida = :f", {f:0})
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
        }
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
    }
}
