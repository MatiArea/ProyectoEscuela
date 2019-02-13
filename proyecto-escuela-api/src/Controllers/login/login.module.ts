import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './../../Services/login.service';

@Module({
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}