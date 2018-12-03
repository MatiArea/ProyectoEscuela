import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';


@Entity() export class Pais {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    nombre : string;

    @OneToMany(type=>Provincia, provincia => provincia.pais, {
      cascade:true
    })
    provincias:Provincia[];
  }
  
  @Entity() export class Provincia {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    nombre : string;

    @OneToMany(type=>Localidad, localidad => localidad.provincia, {
      cascade:true
    })
    localidades:Localidad[];

    @ManyToOne(type=>Pais, pais => pais.provincias)
    pais:Pais;
  }
  
  @Entity() export class Localidad {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    nombre : string;
  
    @Column()
    cp : number;

    @OneToMany(type=>Domicilio, domicilio=>domicilio.localidad, {
      cascade:true
    })
    domicilios: Domicilio[];

    @ManyToOne(type=>Provincia, provincia => provincia.localidades)
    provincia:Provincia;
     
  }
  
  @Entity() export class Domicilio {
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    calle : string;
    
    @Column()
    dpto : string;

    @Column()
    numero : number;

    @ManyToOne(type=>Localidad, localidad => localidad.domicilios)
    localidad:Localidad;
  }