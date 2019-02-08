import { Module } from '@nestjs/common';
import { NotificacionController } from './notificacion.controller';
import { NotificacionService } from 'src/Services/notificacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuenta } from 'src/Entities/Persona/cuenta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cuenta])],
  providers: [NotificacionService],
  controllers: [NotificacionController],
})
export class NotificacionModule {}
