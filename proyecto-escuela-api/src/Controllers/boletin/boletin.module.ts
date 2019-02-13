import { Module } from '@nestjs/common';
import { BoletinController } from './boletin.controller';
import { BoletinService } from './../../Services/boletin.service';

@Module({
  providers: [BoletinService],
  controllers: [BoletinController],
})
export class BoletinModule {}
