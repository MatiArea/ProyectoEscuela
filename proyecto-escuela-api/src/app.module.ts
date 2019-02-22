import { MailService } from './Services/mail.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Profesor } from './Entities/Persona/profesor.entity';
import { Matricula } from './Entities/Persona/matricula.entity';
import { Familiar } from './Entities/Persona/familiar.entity';
import { Cuenta } from './Entities/Persona/cuenta.entity';
import { Alumno } from './Entities/Persona/alumno.entity';
import { Administrativo } from './Entities/Persona/administrativo.entity';
import { Notificacion } from './Entities/Notificacion/notificacion.entity';
import { NotaBoletin } from './Entities/Evaluacion/notaBoletin.entity';
import { Materia } from './Entities/Evaluacion/materia.entity';
import { Horario } from './Entities/Evaluacion/horario.entity';
import { EvaluAlumno } from './Entities/Evaluacion/evaluAlumno.entity';
import { Evaluacion } from './Entities/Evaluacion/evaluacion.entity';
import { Division } from './Entities/Evaluacion/division.entity';
import { Anio } from './Entities/Evaluacion/anio.entity';
import { Boletin } from './Entities/Evaluacion/boletin.entity';
import { LoginService } from './Services/login.service';
import { EvaluacionService } from './Services/evaluacion.service';
import { NotificacionService } from './Services/notificacion.service';
import { BoletinService } from 'src/Services/boletin.service';
import { LoginController } from './Controllers/login/login.controller';
import { EvaluacionController } from './Controllers/evaluacion/evaluacion.controller';
import { NotificacionController } from './Controllers/notificacion/notificacion.controller';
import { BoletinController } from './Controllers/boletin/boletin.controller';
import { LoginModule } from './Controllers/login/login.module';
import { EvaluacionModule } from './Controllers/evaluacion/evaluacion.module';
import { BoletinModule } from './Controllers/boletin/boletin.module';
import { NotificacionModule } from './Controllers/notificacion/notificacion.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'colegiosecundario',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }), TypeOrmModule.forFeature([Alumno, Administrativo, Profesor, Matricula, Familiar, Cuenta, Notificacion, Anio, Boletin, Division, Evaluacion, EvaluAlumno, Horario, Materia, NotaBoletin])],
  controllers:[NotificacionController, BoletinController, EvaluacionController, LoginController, AppController],
  providers: [LoginService, NotificacionService, EvaluacionService, BoletinService, AppService, MailService]
})
export class AppModule {}
