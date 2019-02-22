import { NotificacionBoletinDTO } from './../../Dto/notificacionBoletin.dto';
import { NotificacionEvaluacionDTO } from './../../Dto/notificacionEvaluacion.dto';
import { NotificarOne } from './../../Dto/notificarOne.dto';
import { NotificarTodos } from './../../Dto/notificarTodos.dto';
import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { NotificacionService } from './../../Services/notificacion.service'; 

@Controller('notificaciones')
export class NotificacionController {
    constructor(private readonly notificacionService: NotificacionService) {}

@Get('panel/:legajo')
recuperarNotificacionesNoLeidas(@Param('legajo') parametro){
    return this.notificacionService.getNotificacionesNoLeidas(parametro);
} 

@Get('all/:legajo')
recuperarNotificaciones(@Param('legajo') parametro){
    return this.notificacionService.getNotificaciones(parametro);
}

@Get('display/:id')
verNotificacion(@Param('id') parametro){
    return this.notificacionService.showNotificacion(parametro);
}

@Put('update/:id')
modificarNotificacion(@Param('id') parametro){
    return this.notificacionService.updateNotificacion(parametro);
}

@Post('aviso/enviar/division')
crearAvisoTodos(@Body() body:NotificarTodos){
    return this.notificacionService.createNotificacionAvisoTodos(body);
}

@Post('aviso/enviar/alumnos')
crearAvisoAlumnos(@Body() body:NotificarOne){
    return this.notificacionService.createOneNotificacionAviso(body);
}

@Post('evaluacion/enviar/division')
crearNotificacionEvaluacionTodos(@Body() body:NotificacionEvaluacionDTO){
return this.notificacionService.createNotificacionEvaluacionTodos(body);
}

@Post('boletin/enviar/alumno')
crearNotificacionBoletinAlumno(@Body() body:NotificacionBoletinDTO){
    return this.notificacionService.createNotificacionBoletinAlumno(body);
}


}
