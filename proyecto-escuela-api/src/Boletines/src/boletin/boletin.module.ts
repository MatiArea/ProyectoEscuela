import { Module } from '@nestjs/common';
import { BoletinService } from './boletin.service';

@Module({
  providers: [BoletinService]
})
export class BoletinModule {}
