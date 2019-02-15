import { NotaBoletinDTO } from './notasBoletin.dto';

export class BoletinDTO {
    idBoletin:number;
    trimestre:number;
    notas:NotaBoletinDTO[]
}