import { Module } from '@nestjs/common';
import { NotificacionController } from './notificacion.controller';
import { NotificacionService } from 'src/Services/notificacion.service';

@Module({
  providers: [NotificacionService],
  controllers: [NotificacionController],
})
export class NotificacionModule {}
