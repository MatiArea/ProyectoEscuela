import { Get, Controller, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('colegio')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Get('anios')
  recuperarAnios(){
    return this.appService.getAnios();
  }

  @Get('divisiones/:anio')
  recuperarDivisiones(@Param('anio') parametro){
    return this.appService.getDivisionByAnio(parametro);
  }

  @Get('alumnos/:division')
  recuperarAlumnos(@Param('division') parametro){
    return this.appService.getAlumnosByDivisionID(parametro);
  }

  @Get('alumnos/:anio/:division')
  recuperarAlumnosPorAnio(@Param() parametros){
    return this.appService.getAlumnosByAnioAndDivision(parametros);
  }

  @Get('profesor/materias/:legajo')
  recuperarMaterias(@Param('legajo') parametro){
    return this.appService.getMateriasACargo(parametro);
  }

  @Get('alumno/materias/:legajo')
  recuperarMateriasCursadas(@Param('legajo') parametro){
    return this.appService.getMateriasCursadas(parametro);
  }

}
