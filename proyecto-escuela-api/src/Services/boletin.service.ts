import { BoletinResDTO } from './../Dto/boletinesRecu.dto';
import { Alumno } from './../Entities/Persona/alumno.entity';
import { NotaBoletin } from './../Entities/Evaluacion/notaBoletin.entity';
import { Boletin } from './../Entities/Evaluacion/boletin.entity';
import { Materia } from './../Entities/Evaluacion/materia.entity';
import { Matricula } from './../Entities/Persona/matricula.entity';
import { Division } from './../Entities/Evaluacion/division.entity';
import { Anio } from './../Entities/Evaluacion/anio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getManager, getRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BoletinService {
    constructor(@InjectRepository(Matricula) private matriculaRepository:Repository<Matricula>, 
                @InjectRepository(Alumno) private alumnoRepository:Repository<Alumno>, 
                @InjectRepository(Boletin) private boletinRepository:Repository<Boletin>, 
                @InjectRepository(NotaBoletin) private notaBoletinRepository:Repository<NotaBoletin>){}

    async getBoletinAlumno(codigo){
        const matricula : Matricula = await this.matriculaRepository.createQueryBuilder("matricula").select("matricula").innerJoinAndSelect("matricula.division", "division")
                          .innerJoinAndSelect("division.anio", "anio").innerJoinAndSelect("matricula.alumno", "alumno").where("matricula.codigo = :p", {p:codigo}).getOne();

        const materias = await getConnection().createQueryBuilder(Materia, "materia").select("materia.nombre").addSelect("materia.id").where("materia.anio = :p", {p:matricula.division.anio.id}).getMany();
        

        const boletin = await getConnection().createQueryBuilder(Boletin, "boletin").select("boletin").where("boletin.alumno = :p", {p:matricula.alumno.id}).getOne();
        
        var res = {
            materias:materias,
            boletin:boletin
        }

        return res;
    }

    async cargarNotasBoletin(params){
        for(let indice = 0; indice <= params.notas.length; indice++){
            switch(params.trimestre){
                case 1:const nota1 : NotaBoletin = await this.notaBoletinRepository.createQueryBuilder("notaBoletin").select("notaBoletin").innerJoinAndSelect("notaBoletin.boletin", "boletin").innerJoinAndSelect("notaBoletin.materia", "materia").where("boletin.id = :p", {p:params.idBoletin}).andWhere("materia.id = :m", {m:params.notas[indice].idMateria}).getOne();
                await getConnection().createQueryBuilder(NotaBoletin, "notaBoletin").update(NotaBoletin).set({nota1:params.notas[indice].nota})
                               .where("id = :b", {b:nota1.id}).execute();
                break;
                case 2: const nota2 : NotaBoletin = await this.notaBoletinRepository.createQueryBuilder('notaBoletin').select('notaBoletin').innerJoinAndSelect('notaBoletin.boletin', 'boletin').innerJoinAndSelect('notaBoletin.materia', 'materia').where('boletin.id = :p', {p:params.idBoletin}).andWhere('materia.id = :m', {m:params.notas[indice].idMateria}).getOne();
                
                await getConnection().createQueryBuilder(NotaBoletin, "notaBoletin").update(NotaBoletin).set({nota2:params.notas[indice].nota})
                              .where("id = :b", {b:nota2.id}).execute();
                break;
                case 3: const nota3 : NotaBoletin = await this.notaBoletinRepository.createQueryBuilder('notaBoletin').select('notaBoletin').innerJoinAndSelect('notaBoletin.boletin', 'boletin').innerJoinAndSelect('notaBoletin.materia', 'materia').where('boletin.id = :p', {p:params.idBoletin}).andWhere('materia.id = :m', {m:params.notas[indice].idMateria}).getOne();
                
                await getConnection().createQueryBuilder(NotaBoletin, "notaBoletin").update(NotaBoletin).set({nota3:params.notas[indice].nota})
                               .where("id = :b", {b:nota3.id}).execute();
                break;
                default: let res = {status:500,message:'Error de trimestre'};
                         return res;
            }
            
        } 

        let response = {
            status:200,
            message:'OK'
        }

        return response;
    }

    async updateBoletinTrimestre(par1, par2){
        var  response = {
            status:0,
            message:''
        }
        const uno : number = 1;
        const dos : number = 2;
        const tres : number = 3;
        var variable : number = 0;

        if(par2 == uno){
            variable = uno;
        } else if (par2 == dos){
            variable = dos
        } else if (par2 == tres){
            variable = tres;
        } else {
            return ''
        }
        switch(variable){
            case 1: {await getConnection().createQueryBuilder(Boletin, "boletin").update(Boletin).set({trimestre1:true}).
                          where("id = :p", {p:par1}).execute();   
                          response.status=200;
                          response.message="OK";
                                                
            break;}
            case 2: {await getConnection().createQueryBuilder(Boletin, "boletin").update(Boletin).set({trimestre2:true}).
                          where("id = :p", {p:par1}).execute();
                          response.status=200;
                          response.message="OK";  
            break;}
            case 3: {await getConnection().createQueryBuilder(Boletin, "boletin").update(Boletin).set({trimestre3:true}).
                          where("id = :p", {p:par1}).execute();
                          response.status=200;
                          response.message="OK";  
            break;}
            default: {response.status=500; response.message="Error de trimestre";
            break;}
        }
        return response;
    }

    async getBoletinesTodos(){
        const boletines : Boletin[] = await this.boletinRepository.createQueryBuilder("boletin").select("boletin").addSelect("matricula.codigo").addSelect("division.nombre").addSelect("alumno.nombre").addSelect("alumno.apellido").addSelect("alumno.legajo").addSelect("anio.numero")
                                       .innerJoin("boletin.alumno", "matricula").innerJoin("matricula.division", "division").innerJoin("matricula.alumno", "alumno").innerJoin("division.anio", "anio").getMany();
        return boletines;
        
    }

    async getBoletinesTodosByDivision(division){
        const boletines : Boletin[] = await this.boletinRepository.createQueryBuilder("boletin").select("boletin").addSelect("matricula.codigo").addSelect("division.nombre").addSelect("alumno.nombre").addSelect("alumno.apellido").addSelect("alumno.legajo").addSelect("anio.numero")
        .innerJoin("boletin.alumno", "matricula").innerJoin("matricula.division", "division").innerJoin("matricula.alumno", "alumno").innerJoin("division.anio", "anio").where("matricula.division = :p", {p:division}).getMany();  
        return boletines; 
    }


    async showBoletin(legajo){
        const alumno : Alumno = await this.alumnoRepository.createQueryBuilder("alumno").select("alumno").where("alumno.legajo = :p", {p:legajo}).getOne();
        const boletin : Boletin = await this.boletinRepository.createQueryBuilder("boletin").select("boletin").where("boletin.alumno = :p", {p:alumno.id}).getOne();
        const notas = await getConnection().createQueryBuilder(NotaBoletin, "notaBoletin").select("notaBoletin.nota1").addSelect("notaBoletin.nota2").addSelect("notaBoletin.nota3")
                      .addSelect("materia.nombre").innerJoin("notaBoletin.materia", "materia").where("notaBoletin.boletin = :p", {p:boletin.id}).getMany();
        var res = {
            boletin:boletin,
            notas:notas
        }
        return res;
    }

}
