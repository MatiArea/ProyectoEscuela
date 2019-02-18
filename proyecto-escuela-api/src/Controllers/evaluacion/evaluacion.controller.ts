import { NotasDTO } from './../../Dto/notas.dto';
import { EvaluacionDTO } from './../../Dto/evaluacion.dto';
import { EvaluAlumnoDTO } from './../../Dto/evaluAlumnos.dto';
import { NotasDTO } from './../../Dto/notas.dto';
import { EvaluacionService } from 'src/Services/evaluacion.service';
import { Controller, Get, Body, Param, Post, Put } from '@nestjs/common';

@Controller('evaluacion')
export class EvaluacionController {
    constructor(private readonly evaluacionService: EvaluacionService) {}

    @Get('cargarNotas/:materia/:legajo/:anio/:division')
    recuperarEvaluacionesNoCargadas(@Param() parametros){
        return this.evaluacionService.getEvaluacionesSinCargar(parametros);//trae eva sin cargar
    }

    @Post('cargarNotas/insert')
    crearNotasEvaluaciones(@Body() body:EvaluAlumnoDTO){
        return this.evaluacionService.createEvaluAlumnos(body);//carga
    }

    @Put('cargarNotas/update/:folio')
    modificarEvaluacion(@Param('folio') parametro){
        return this.evaluacionService.updateEvaluacion(parametro);//pone la evalu cargada
    }

    @Get('todas/:legajo')
    recuperarEvaluacionesTodas(@Param('legajo') parametro){
       return this.evaluacionService.getEvaluacionesTodas(parametro);//todas las evalu del profe(cargadas)
    }

    @Get('todas/cargadas/:materia/:legajo/:anio/:division')
    recuperarEvaluacionesCargadas(@Param() parametros){
        return this.evaluacionService.getEvaluacionesCargadas(parametros);// todas las cargadas en una division
    }

    @Get('folio')
    generarFolio(){
        return this.evaluacionService.getFolio();
    }

    @Post('create')
    crearEvaluacion(@Body() body:EvaluacionDTO){
        this.evaluacionService.createEvaluacion(body);
    }

    @Get('display/:folio')
    recuperarEvaluacionCompleta(@Param('folio') parametro){
        return this.evaluacionService.getEvaluacionCompleta(parametro);//evalucion al hacer click
    }

    @Get('todas/alumno/:legajo/:materia')
    recuperarEvaluacionesAlumno(@Param() parametros){
        return this.evaluacionService.getEvaluacionesAlumnoTodas(parametros);//obtener todas las evaluaciones de una materia del alumno
    }

}
