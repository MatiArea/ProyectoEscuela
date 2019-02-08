import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { Cuenta } from 'src/Entities/Persona/cuenta.entity';

@Injectable()
export class NotificacionService {
    constructor(
    @InjectRepository(Cuenta) private cuentaRepository: Repository<Cuenta>) {}

    async recuperarUsuario(idCuenta: number ){
        return await this.cuentaRepository.findOne({where: {id: idCuenta}});
    }
}
