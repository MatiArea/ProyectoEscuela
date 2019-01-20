import { Module } from '@nestjs/common';
import { AvisoController } from './aviso.controller';
import { AvisoService } from 'src/Services/aviso.service';

@Module({
  providers: [AvisoService],
  controllers: [AvisoController],
})
export class AvisoModule {}
