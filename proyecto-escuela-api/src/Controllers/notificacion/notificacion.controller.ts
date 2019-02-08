import { Controller, Get } from '@nestjs/common';
import { NotificacionService } from 'src/Services/notificacion.service';

@Controller('notificacion')
export class NotificacionController {
    constructor(public notificacionService: NotificacionService){}

@Get('/crearAviso')
async crearAviso() {
   }

}
