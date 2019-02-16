import { BoletinDTO } from './../../Dto/boletin.dto';
import { BoletinService } from './../../Services/boletin.service';
import { Controller, Get, Param, Body, Post, Put } from '@nestjs/common';

@Controller('boletin')
export class BoletinController {
    constructor(private readonly boletinService: BoletinService) {}

    @Get('materias/alumno/:codigo')
    recuperarMateriasAlumno(@Param('codigo') parametro){
        return this.boletinService.getBoletinAlumno(parametro);//click en alumno, para mostrar el boletin con sus materias 
    }

    @Post('notas/insert')
    crearNotasBoletin(@Body() body:BoletinDTO){
        return this.boletinService.cargarNotasBoletin(body);//boton cargar
    }

    @Get('all')
        recuperarBoletinesTodos(){
            return this.boletinService.getBoletinesTodos();        
    }

    @Get('all/division/:id')
    recuperarBoletinesByID(@Param('id') parametro){
        return this.boletinService.getBoletinesTodosByDivision(parametro);//boletiens filtrados
    }

    @Put('boletin/update/:boletin/:trimestre')
    modificarBoletinTrimestre(@Param() parametros){
        return this.boletinService.updateBoletinTrimestre(parametros);//IMPORTANTE UPDATEAR EL BOLETIN QUE SE ACABA DE CARGAR CON EL NUMERO DE TRIMESTRE QUE SE ACABA DE CARGAR
    } 

    @Get('display/:legajo')
    recuperarBoletin(@Param('legajo') parametro){
        return this.boletinService.showBoletin(parametro);//muestra boletin al hacer click
    }
}
