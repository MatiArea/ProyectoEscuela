import { Module } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';

@Module({
  providers: [NotificacionService]
})
export class NotificacionModule {}
