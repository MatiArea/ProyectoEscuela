import { JoinColumn } from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne} from 'typeorm';
import{Familiar} from './persona.entity';
import {Matricula, Anio} from './evaluacion.entity';

@Entity() export class TipoPago {
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  nombre: string;

}

@Entity() export class Pago {
  @PrimaryGeneratedColumn()
  id : number;

  @Column('date')
  fecha: string;

  @Column()
  monto: number;

  @OneToOne(type => TipoPago)
  @JoinColumn()
  tipo:TipoPago;

  @OneToMany(type => Arancel, arancel => arancel.pago, {
    cascade:true
  })
  aranceles:Arancel[];

}

@Entity() export class Arancel {
  @PrimaryGeneratedColumn()
  id : number;

  @Column('date')
  fechaEmision: string;
  
  @Column('date')
  fechaVencimiento : string;

  @Column('float')
  total : number;

  @ManyToOne(type => Familiar, familiar => familiar.aranceles)
  responsableFinanciero:Familiar;

  @ManyToOne(type => Pago, pago => pago.aranceles)
  pago:Pago;

  @OneToMany(type => ArancelDetalle, arancelDetalle => arancelDetalle.arancel, {
    cascade:true
  })
  detalles:ArancelDetalle[];    

}

@Entity() export class Factura {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    numero: number;
    
    @Column('float')
    total : number;

    @ManyToOne(type => Familiar, familiar => familiar.facturas)
    responsableFinanciero:Familiar;

    @OneToMany(type => FacturaDetalle, facturaDetalle => facturaDetalle.factura, {
      cascade:true
    })
    detalles:FacturaDetalle[];

    @OneToOne(type => Arancel)
    @JoinColumn()
    arancel:Arancel;

  }
  
  @Entity() export class Concepto {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    codigo: string;
    
    @Column()
    nombre : string;

    @Column('float')
    porcentajeDescuento : number;

    @Column('float')
    precio : number;

    @OneToMany(type => ConceptoCuota, conceptoCuota => conceptoCuota.cuota, {
      cascade:true
    })
    detallesCuota:ConceptoCuota[];

    @OneToMany(type => ConceptoDetalle, conceptoDetalle => conceptoDetalle.concepto, {
      cascade:true
    })
    detalles:ConceptoDetalle[];

    @OneToMany(type => ArancelDetalle, arancelDetalle => arancelDetalle.concepto, {
      cascade:true
    })
    detallesArancel:ArancelDetalle[];

    @OneToMany(type => FacturaDetalle, facturaDetalle => facturaDetalle.concepto, {
      cascade:true
    })
    detallesFactura:FacturaDetalle[];

  }

  @Entity() export class FacturaDetalle {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    cantidad: number;
    
    @Column('float')
    subTotal : number;

    @ManyToOne(type => Concepto, concepto => concepto.detallesFactura)
    concepto:Concepto;

    @ManyToOne(type => Factura, factura => factura.detalles)
    factura:Factura;

  }

  @Entity() export class EstadoCuota {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    nombre: string;

  }

  @Entity() export class Cuota {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('date')
    fechaEmision: string;

    @Column()
    monto: number;

    @Column()
    numero: number;

    @ManyToOne(type => Matricula, matricula => matricula.cuotas)
    matricula:Matricula;

    @OneToOne(type => EstadoCuota)
    @JoinColumn()
    estado:EstadoCuota;
    
    @OneToMany(type => ConceptoCuota, conceptoCuota => conceptoCuota.cuota, {
      cascade:true
    })
    detalles:ConceptoCuota[];
  }

  @Entity() export class ConceptoCuota {
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(type => Cuota, cuota => cuota.detalles)
    cuota:Cuota;

    @ManyToOne(type => Concepto, concepto => concepto.detallesCuota)
    concepto:Concepto;
  
  }

  @Entity() export class ArancelDetalle {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column('float')
    subtotal: number;

    @Column()
    cantidad: number;

    @ManyToOne(type => Arancel, arancel => arancel.detalles)
    arancel:Arancel;

    @ManyToOne(type => Concepto, concepto => concepto.detallesArancel)
    concepto:Concepto;


  }

  @Entity() export class ConceptoDetalle {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column('float')
    porcentajeDescuento: number;

    @ManyToOne(type => Matricula, matricula => matricula.conceptos)
    matricula:Matricula;

    @ManyToOne(type => Concepto, concepto => concepto.detalles)
    concepto:Concepto;

  }

  @Entity() export class ValorArancel {
    @PrimaryGeneratedColumn()
    id : number;

    @OneToOne(type => Anio)
    @JoinColumn()
    anio:Anio;
  
  }
