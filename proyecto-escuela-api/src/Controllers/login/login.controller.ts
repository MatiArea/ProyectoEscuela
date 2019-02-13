import { LoginDTO } from './../../Dto/login.dto';
import { LoginService } from './../../Services/login.service';
import { Controller, Get, Param, Body, Post } from '@nestjs/common';


@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

 @Post()
 login(@Body() parametros:LoginDTO){
  return this.loginService.validateLogin(parametros);
 }
}