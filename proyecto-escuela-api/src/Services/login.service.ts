import { LoginDTO } from './../Dto/login.dto';
import { Administrativo } from './../Entities/Persona/administrativo.entity';
import { Profesor } from './../Entities/Persona/profesor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Alumno } from './../Entities/Persona/alumno.entity';
import { Cuenta } from './../Entities/Persona/cuenta.entity';
import { getConnection, getRepository, getManager, Repository} from 'typeorm';
import { Injectable } from '@nestjs/common';


@Injectable()
export class LoginService {

    constructor(@InjectRepository(Alumno) private alumnoRepository:Repository<Alumno>, 
                @InjectRepository(Cuenta) private cuentaRepository:Repository<Cuenta>,
                @InjectRepository(Profesor) private profesorRepository:Repository<Profesor>, 
                @InjectRepository(Administrativo) private administrativoRepository:Repository<Administrativo>){}

    
    async validateLogin(params){
        const usuario : Cuenta[] = await this.cuentaRepository.createQueryBuilder("cuenta")
                                        .select("cuenta").where("cuenta.user = :p1", {p1:params.user})
                                        .andWhere("cuenta.pass = :p2", {p2:params.pass}).getMany();
        if(usuario.length == 0){ 
            let res = {
                status:500,
                nombre:'',
                apellido:'',
                legajo:0,
                dni:0,
                roll:''
            }         
            return res;
        } else { 
        
        let arreglo = ["Alumno", "Profesor", "Preceptor"];
        let indice = 0;
        let control;
        for(indice; indice<=2;indice++){
             if(usuario[0].roll == arreglo[indice]){
                 control=indice;
             }
        }
        control+=1;

        switch (control){
            case 1: 
            const alu : Alumno = await this.alumnoRepository.createQueryBuilder("alumno").select("alumno")
            .where("alumno.cuenta = :p", {p:usuario[0].id}).getOne(); 
            let res1 = {
                status:200,
                nombre:alu.nombre,
                apellido:alu.apellido,
                legajo:alu.legajo,
                dni:alu.dni,
                roll:usuario[0].roll
            }     
            return res1;

            case 2:
            const profe : Profesor = await this.profesorRepository.createQueryBuilder("profesor").select("profesor")
            .where("profesor.cuenta = :p", {p:usuario[0].id}).getOne();
            let res2 = {
                status:200,
                nombre:profe.nombre,
                apellido:profe.apellido,
                legajo:profe.legajo,
                dni:profe.dni,
                roll:usuario[0].roll
            }     
            return res2;

            case 3:
            const admin : Administrativo = await this.administrativoRepository.createQueryBuilder("administrativo").select("administrativo")
            .where("administrativo.cuenta = :p", {p:usuario[0].id}).getOne();
            let res3 = {
                status:200,
                nombre:admin.nombre,
                apellido:admin.apellido,
                legajo:'',
                dni:admin.dni,
                roll:usuario[0].roll
            }     
            return res3;

            default:return 'error';
        }
        
       
        }
        
    }
 
}