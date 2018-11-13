import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';
import { join } from 'path';


@Entity() export class Notificacion{
    @PrimaryGeneratedColumn()
    id : number; 

    @Column('')
    descripcion : string;

    @Column('')
    fecha : Date;

}

@Entity() 
export class notificacionaviso{
    @PrimaryGeneratedColumn()
    id : number; 
}

@Entity()
export class notificacionevaluacion{
    @PrimaryGeneratedColumn()
    id : number;
}

@Entity() 
export class notificacionboletin{
    @PrimaryGeneratedColumn()
    id : number;
}

@Entity()
export class tiponotificacion{
    @PrimaryGeneratedColumn()
    id : number;

    @Column('')
    nombre : string;
}

@Entity()
export class aviso{
    @PrimaryGeneratedColumn()
    id : number;

    @Column('')
    titulo : string;

    @Column('')
    descripcion : string;
}

