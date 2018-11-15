import { Module } from '@nestjs/common';
import { AvisoService } from './aviso.service';

@Module({
  providers: [AvisoService]
})
export class AvisoModule {}
